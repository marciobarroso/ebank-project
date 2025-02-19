package digital.ebank.financial.services.common.domain.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
	
	private Long id;
	
	private TransactionType type;
	
	private BigDecimal amount;
	
	private BigDecimal calculatedFee;
	
	private TransactionStatus status;
	
	private LocalDateTime createdAt;
	
	private String feeCalculationMetadata;
	
	private LocalDateTime feeCalculatedAt;
	
	public enum TransactionType {
		DEPOSIT, WITHDRAWAL, TRANSFER, PAYMENT
	}
	
	public enum TransactionStatus {
		PENDING, PROCESSING, PROCESSED
	}
	
}


