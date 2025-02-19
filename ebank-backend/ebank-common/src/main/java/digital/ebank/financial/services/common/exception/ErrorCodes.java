package digital.ebank.financial.services.common.exception;

public final class ErrorCodes {
    private ErrorCodes() {}
    
    public static final class Validation {
        private Validation() {}
        public static final String INVALID_REQUEST = "VALIDATION-001";
    }
    
    public static final class System {
        private System() {}
        public static final String UNEXPECTED_ERROR = "SYSTEM-001";
    }
} 