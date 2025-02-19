package digital.ebank.financial.services.common.exception;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class ErrorResponse {
    String code;
    String message;
    String path;
    LocalDateTime timestamp;
} 
