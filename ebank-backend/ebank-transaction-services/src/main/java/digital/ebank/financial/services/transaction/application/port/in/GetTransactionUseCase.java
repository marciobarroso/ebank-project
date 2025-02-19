package digital.ebank.financial.services.transaction.application.port.in;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import digital.ebank.financial.services.common.domain.model.Transaction;
import digital.ebank.financial.services.common.domain.model.Transaction.TransactionType;
import lombok.Value;

public interface GetTransactionUseCase {
	
	Optional<Transaction> getTransaction(GetTransactionCommand command);
    Page<Transaction> getAllTransactions(GetAllTransactionsCommand command);
    Set<Transaction> getPendingTransactions();
	
    @Value
	class GetTransactionCommand {
		Long id;
	}
	
	
	@Value
	class GetAllTransactionsCommand {
		Pageable pageable;
		TransactionType type;
	}
}
