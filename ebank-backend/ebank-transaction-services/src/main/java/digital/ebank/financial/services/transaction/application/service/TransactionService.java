package digital.ebank.financial.services.transaction.application.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import digital.ebank.financial.services.common.domain.model.Rate;
import digital.ebank.financial.services.common.domain.model.Transaction;
import digital.ebank.financial.services.common.domain.model.Transaction.TransactionStatus;
import digital.ebank.financial.services.common.domain.model.Transaction.TransactionType;
import digital.ebank.financial.services.transaction.application.port.in.CreateTransactionUseCase;
import digital.ebank.financial.services.transaction.application.port.in.GetTransactionUseCase;
import digital.ebank.financial.services.transaction.application.port.in.UpdatePendingTransactionsUseCase;
import digital.ebank.financial.services.transaction.application.port.out.TransactionRepository;
import digital.ebank.financial.services.transaction.infrastructure.adapter.out.rest.RateServiceAdapter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class TransactionService implements CreateTransactionUseCase, GetTransactionUseCase, UpdatePendingTransactionsUseCase {

	private final TransactionRepository transactionRepository;
	private final RateServiceAdapter rateServiceAdapter;
	
	@Override
	public Transaction createTransaction(CreateTransactionCommand command) {
		// save initial transaction
		Transaction transaction = Transaction.builder()
				.amount(command.getAmount())
				.type(command.getType())
				.createdAt(LocalDateTime.now())
				.status(TransactionStatus.PENDING)
				.calculatedFee(BigDecimal.ZERO)
				.build();
				
		return transactionRepository.save(transaction);
	}

	@Override
	public Optional<Transaction> getTransaction(GetTransactionCommand command) {
		return transactionRepository.findById(command.getId());
	}

	@Override
	public Page<Transaction> getAllTransactions(GetAllTransactionsCommand command) {
		return transactionRepository.findByType(command.getPageable(), command.getType());
	}

	@Override
	public void getPendingTransactionsAndCalculateFees() {
		// Get all rates and group them by transaction type
		Set<Rate> allRates = rateServiceAdapter.getAllRates();
		Map<TransactionType, Set<Rate>> ratesByType = allRates.stream()
			.collect(Collectors.groupingBy(
				Rate::getType,
				Collectors.toSet()
			));
		
		// Get all pending transactions
		Set<Transaction> pendingTransactions = getPendingTransactions();
		
		// Process each pending transaction
		pendingTransactions.forEach(transaction -> {
			// Get rates for this transaction type
			Set<Rate> applicableRates = ratesByType.getOrDefault(transaction.getType(), Collections.emptySet());
			
			// Build calculation metadata
			List<Map<String, Object>> rateDetails = applicableRates.stream()
				.map(rate -> {
					BigDecimal calculatedAmount = transaction.getAmount().multiply(rate.getRate());
					Map<String, Object> rateDetail = new HashMap<>();
					rateDetail.put("rateId", rate.getId());
					rateDetail.put("rate", rate.getRate());
					rateDetail.put("description", rate.getDescription());
					rateDetail.put("calculatedAmount", calculatedAmount);
					return rateDetail;
				})
				.collect(Collectors.toList());
				
			Map<String, Object> metadata = Map.of(
				"transactionAmount", transaction.getAmount(),
				"appliedRates", rateDetails,
				"totalRates", applicableRates.size()
			);
			
			// Convert metadata to JSON string
			try {
				String metadataJson = new ObjectMapper().writeValueAsString(metadata);
				transaction.setFeeCalculationMetadata(metadataJson);
				
				// Calculate total fee using all applicable rates
				BigDecimal totalFee = applicableRates.stream()
					.map(rate -> transaction.getAmount().multiply(rate.getRate()))
					.reduce(BigDecimal.ZERO, BigDecimal::add);
				
				// Update transaction with calculated fee and metadata
				transaction.setCalculatedFee(totalFee);
				transaction.setStatus(TransactionStatus.PROCESSED);
				transaction.setFeeCalculatedAt(LocalDateTime.now());
				
				// Save the updated transaction
				transactionRepository.save(transaction);
				
				log.info("Processed pending transaction: {} with total fee: {}", 
					transaction.getId(), totalFee);
			} catch (JsonProcessingException e) {
				log.error("Error serializing fee calculation metadata", e);
			}
		});
	}

	@Override
	public Set<Transaction> getPendingTransactions() {
		return transactionRepository.findByStatusPending();
	}
}
