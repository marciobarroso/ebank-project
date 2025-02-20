package digital.ebank.financial.services.transaction.infrastructure.adapter.out.persistence;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import digital.ebank.financial.services.common.domain.model.Transaction;
import digital.ebank.financial.services.common.domain.model.Transaction.TransactionType;
import digital.ebank.financial.services.transaction.application.port.out.TransactionRepository;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TransactionPersistenceAdapter implements TransactionRepository {

    private final TransactionJpaRepository transactionJpaRepository;
    private final TransactionMapper transactionMapper;

    @Override
    public Transaction save(Transaction transaction) {
        TransactionEntity transactionEntity = transactionMapper.toEntity(transaction);
        TransactionEntity savedEntity = transactionJpaRepository.save(transactionEntity);
        return transactionMapper.toDomain(savedEntity);
    }

    @Override
    public Optional<Transaction> findById(Long id) {
        return transactionJpaRepository.findById(id)
                .map(transactionMapper::toDomain);
    }

    @Override
    public Page<Transaction> findByType(Pageable pageable, TransactionType type) {
        return transactionJpaRepository.findByType(pageable, type)
                .map(transactionMapper::toDomain);
    }

	@Override
	public Set<Transaction> findByStatusPending() {
		return transactionJpaRepository.findByStatusPending().stream()
				.map(transactionMapper::toDomain)
				.collect(Collectors.toSet());
	}

	@Override
	public Page<Transaction> findAll(Pageable pageable) {
		return transactionJpaRepository.findAll(pageable)
				.map(transactionMapper::toDomain);
	}
} 

