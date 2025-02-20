package digital.ebank.financial.services.rate.application.port.in;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import digital.ebank.financial.services.common.domain.model.Rate;
import digital.ebank.financial.services.common.domain.model.Transaction.TransactionType;
import lombok.Value;

public interface GetRateUseCase {
    
	Rate getRate(GetRateCommand command);

    Page<Rate> getAllRates(GetAllRatesCommand command);

    Set<Rate> getAllRatesForAutomation(GetAllRatesForAutomationCommand command); 
    
    @Value
    class GetRateCommand {
        Long id;
    }

    @Value
    class GetAllRatesCommand {
        Pageable pageable;
        TransactionType type;
        String description;
    }
    
    @Value
    class GetAllRatesForAutomationCommand {}
}
