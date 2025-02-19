package digital.ebank.financial.services.user.application.exception;

import digital.ebank.financial.services.common.exception.BusinessException;

public class UserException extends BusinessException {
    private static final long serialVersionUID = -7051902954220630471L;
	public static final String EMAIL_ALREADY_EXISTS = "USER-001";
    public static final String INVALID_EMAIL_FORMAT = "USER-002";
    public static final String INVALID_PASSWORD_FORMAT = "USER-003";
    public static final String INVALID_NAME_FORMAT = "USER-004";
    public static final String USER_NOT_FOUND = "USER-005";

    public UserException(String code, String message) {
        super(code, message);
    }
} 