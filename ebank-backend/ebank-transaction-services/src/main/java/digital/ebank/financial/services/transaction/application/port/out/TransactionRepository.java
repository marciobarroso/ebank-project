package digital.ebank.financial.services.transaction.application.port.out;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import digital.ebank.financial.services.common.domain.model.Transaction;
import digital.ebank.financial.services.common.domain.model.Transaction.TransactionType;

public interface TransactionRepository {
	Transaction save(Transaction transaction);

	Optional<Transaction> findById(Long id);

	Page<Transaction> findByType(Pageable pageable, TransactionType type);
	
	Page<Transaction> findAll(Pageable pageable);

	Set<Transaction> findByStatusPending();
}
