package digital.ebank.financial.services.transaction.infrastructure.adapter.out.persistence;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import digital.ebank.financial.services.common.domain.model.Transaction.TransactionStatus;
import digital.ebank.financial.services.common.domain.model.Transaction.TransactionType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "transactions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Enumerated(EnumType.STRING)
	@Column(name = "type")
	private TransactionType type;

	@Column(name = "amount", precision = 19, scale = 2)
	private BigDecimal amount;

	@Column(name = "calculated_fee", precision = 19, scale = 2)
	private BigDecimal calculatedFee;

	@Enumerated(EnumType.STRING)
	@Column(name = "status")
	private TransactionStatus status;

	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@Column(name = "fee_calculation_metadata", columnDefinition = "json", nullable = true)
	private String feeCalculationMetadata;

	@Column(name = "fee_calculated_at", nullable = true)
	private LocalDateTime feeCalculatedAt;

}