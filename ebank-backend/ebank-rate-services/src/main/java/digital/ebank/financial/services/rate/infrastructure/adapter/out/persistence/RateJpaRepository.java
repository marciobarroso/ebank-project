package digital.ebank.financial.services.rate.infrastructure.adapter.out.persistence;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import digital.ebank.financial.services.common.domain.model.Transaction.TransactionType;

@Repository
public interface RateJpaRepository extends JpaRepository<RateEntity, Long> {
    Page<RateEntity> findAll(Pageable pageable);
    Page<RateEntity> findByTypeAndActiveTrue(TransactionType type, Pageable pageable);
    Page<RateEntity> findByTypeAndActiveTrueAndDescriptionContainingIgnoreCase(TransactionType type, String description, Pageable pageable);
    Page<RateEntity> findByActiveTrueAndDescriptionContainingIgnoreCase(String description, Pageable pageable);
    Set<RateEntity> findByActiveTrue();
} 
