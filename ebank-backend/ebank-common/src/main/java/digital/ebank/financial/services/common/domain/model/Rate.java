package digital.ebank.financial.services.common.domain.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import digital.ebank.financial.services.common.domain.model.Transaction.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Rate {

	private Long id;

	private TransactionType type;

	private BigDecimal rate;

	private String description;

	private Boolean active;

	private LocalDateTime createdAt;

}
