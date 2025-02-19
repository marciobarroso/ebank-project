package digital.ebank.financial.services.transaction.application.port.in;

import java.math.BigDecimal;

import digital.ebank.financial.services.common.domain.model.Transaction;
import digital.ebank.financial.services.common.domain.model.Transaction.TransactionType;
import lombok.Value;

public interface CreateTransactionUseCase {
		
	Transaction createTransaction(CreateTransactionCommand command);

	@Value
	class CreateTransactionCommand {
		BigDecimal amount;
		TransactionType type;
	}
}
