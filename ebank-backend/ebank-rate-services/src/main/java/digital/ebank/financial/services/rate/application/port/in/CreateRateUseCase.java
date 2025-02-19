package digital.ebank.financial.services.rate.application.port.in;

import java.math.BigDecimal;

import digital.ebank.financial.services.common.domain.model.Rate;
import digital.ebank.financial.services.common.domain.model.Transaction.TransactionType;
import lombok.Value;

public interface CreateRateUseCase {

	Rate createRate(CreateRateCommand command);

	@Value
	class CreateRateCommand {
		BigDecimal rate;
		TransactionType type;
		String description;
	}
}
