package digital.ebank.financial.services.rate.application.port.out;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import digital.ebank.financial.services.common.domain.model.Rate;
import digital.ebank.financial.services.common.domain.model.Transaction.TransactionType;

public interface RateRepository {
	Rate save(Rate rate);
	Optional<Rate> findById(Long id);
    Page<Rate> findByTypeAndActiveTrue(TransactionType type, Pageable pageable);
    Page<Rate> findByTypeAndActiveTrueAndDescriptionContainingIgnoreCase(TransactionType type, String description, Pageable pageable);
    Page<Rate> findByActiveTrueAndDescriptionContainingIgnoreCase(String description, Pageable pageable);
	Page<Rate> findAll(Pageable pageable);
	Set<Rate> findByActiveTrue();
}