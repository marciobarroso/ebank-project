package digital.ebank.financial.services.rate.infrastructure.adapter.out.persistence;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import digital.ebank.financial.services.common.domain.model.Rate;
import digital.ebank.financial.services.common.domain.model.Transaction.TransactionType;
import digital.ebank.financial.services.rate.application.port.out.RateRepository;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RatePersistenceAdapter implements RateRepository {

    private final RateJpaRepository rateJpaRepository;
    private final RateMapper rateMapper;

    @Override
    public Rate save(Rate rate) {
        RateEntity entity = rateMapper.toEntity(rate);
        RateEntity savedEntity = rateJpaRepository.save(entity);
        return rateMapper.toDomain(savedEntity);
    }

    @Override
    public Optional<Rate> findById(Long id) {
        return rateJpaRepository.findById(id)
                .map(rateMapper::toDomain);
    }

    @Override
    public Page<Rate> findAll(Pageable pageable) {
        return rateJpaRepository.findAll(pageable)
                .map(rateMapper::toDomain);
    }

	@Override
	public Set<Rate> findByActiveTrue() {
		return rateJpaRepository.findByActiveTrue().stream()
				.map(rateMapper::toDomain).collect(Collectors.toSet());
	}

	@Override
	public Page<Rate> findByTypeAndActiveTrueAndDescriptionContainingIgnoreCase(TransactionType type,
			String description, Pageable pageable) {
		return rateJpaRepository.findByTypeAndActiveTrueAndDescriptionContainingIgnoreCase(type, description, pageable)
				.map(rateMapper::toDomain);
	}

	@Override
	public Page<Rate> findByActiveTrueAndDescriptionContainingIgnoreCase(String description, Pageable pageable) {
		return rateJpaRepository.findByActiveTrueAndDescriptionContainingIgnoreCase(description, pageable)
				.map(rateMapper::toDomain);
	}

	@Override
	public Page<Rate> findByTypeAndActiveTrue(TransactionType type, Pageable pageable) {
		return rateJpaRepository.findByTypeAndActiveTrue(type, pageable)
				.map(rateMapper::toDomain);
	}
} 

