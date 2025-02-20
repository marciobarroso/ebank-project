package digital.ebank.financial.services.rate.application.service;

import java.time.LocalDateTime;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import digital.ebank.financial.services.common.domain.model.Rate;
import digital.ebank.financial.services.rate.application.exception.RateException;
import digital.ebank.financial.services.rate.application.port.in.CreateRateUseCase;
import digital.ebank.financial.services.rate.application.port.in.GetRateUseCase;
import digital.ebank.financial.services.rate.application.port.out.RateRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RateService implements GetRateUseCase, CreateRateUseCase {

	private final RateRepository rateRepository;

	@Override
	public Rate getRate(GetRateCommand command) {
		return rateRepository.findById(command.getId())
				.orElseThrow(() -> new RateException(RateException.RATE_NOT_FOUND,
						"Rate not found for transaction rate id : " + command.getId()));
	}

	@Override
	public Page<Rate> getAllRates(GetAllRatesCommand command) {
		// both not null
		if (command.getType() != null && command.getDescription() != null)
			return rateRepository.findByTypeAndActiveTrueAndDescriptionContainingIgnoreCase(command.getType(),
					command.getDescription(), command.getPageable());
		
		// type null and description not null
		if (command.getType() == null && command.getDescription() != null)
			return rateRepository.findByActiveTrueAndDescriptionContainingIgnoreCase(command.getDescription(),
					command.getPageable());
		
		// type not null and description null
		if (command.getType() != null && command.getDescription() == null)
			return rateRepository.findByTypeAndActiveTrue(command.getType(), command.getPageable());
		
		// else
		return rateRepository.findAll(command.getPageable());
	}

	@Override
	public Rate createRate(CreateRateCommand command) {
		// save rate
		Rate rate = Rate.builder().active(true).createdAt(LocalDateTime.now()).description(command.getDescription())
				.type(command.getType()).rate(command.getRate()).build();

		return rateRepository.save(rate);
	}

	@Override
	public Set<Rate> getAllRatesForAutomation(GetAllRatesForAutomationCommand command) {
		return rateRepository.findByActiveTrue();
	}

}
