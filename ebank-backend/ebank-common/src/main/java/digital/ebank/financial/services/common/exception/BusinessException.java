package digital.ebank.financial.services.common.exception;

import lombok.Getter;

@Getter
public class BusinessException extends RuntimeException {
    
	private static final long serialVersionUID = 3772813682207996552L;
	
    private final String code;
    private final String message;

    public BusinessException(String code, String message) {
        super(message);
        this.code = code;
        this.message = message;
    }
} 