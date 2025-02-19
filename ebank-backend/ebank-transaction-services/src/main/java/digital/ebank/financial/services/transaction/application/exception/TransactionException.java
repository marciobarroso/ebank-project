package digital.ebank.financial.services.transaction.application.exception;

import digital.ebank.financial.services.common.exception.BusinessException;

public class TransactionException extends BusinessException {

    private static final long serialVersionUID = 3516139159230340365L;

    public static final String TRANSACTION_NOT_FOUND = "TRANSACTION-001";
    
	public TransactionException(String code, String message) {
        super(code, message);
    }
} 