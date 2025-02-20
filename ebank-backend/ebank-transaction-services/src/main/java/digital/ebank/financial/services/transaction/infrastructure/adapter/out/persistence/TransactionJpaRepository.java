package digital.ebank.financial.services.transaction.infrastructure.adapter.out.persistence;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import digital.ebank.financial.services.common.domain.model.Transaction.TransactionType;

@Repository
public interface TransactionJpaRepository extends JpaRepository<TransactionEntity, Long> {
    Page<TransactionEntity> findByType(Pageable pageable, TransactionType type);
    
    @Query("SELECT a FROM TransactionEntity a WHERE a.status = 'PENDING'")
    Set<TransactionEntity> findByStatusPending();
} 
