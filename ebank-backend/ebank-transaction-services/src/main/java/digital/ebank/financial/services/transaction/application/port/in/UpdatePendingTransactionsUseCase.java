package digital.ebank.financial.services.transaction.application.port.in;

import lombok.Value;

public interface UpdatePendingTransactionsUseCase {
	
	void getPendingTransactionsAndCalculateFees();
	
    @Value
	class getPendingTransactionsAndCalculateFeesCommand { }
	
}
