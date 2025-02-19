package digital.ebank.financial.services.rate.application.exception;

import digital.ebank.financial.services.common.exception.BusinessException;

public class RateException extends BusinessException {

    private static final long serialVersionUID = 3516139159230340365L;

    public static final String RATE_NOT_FOUND = "RATE-001";
    
	public RateException(String code, String message) {
        super(code, message);
    }
} 