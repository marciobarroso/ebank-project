package digital.ebank.financial.services.transaction.infrastructure.adapter.out.persistence;

import org.mapstruct.Mapper;

import digital.ebank.financial.services.common.domain.model.Transaction;

@Mapper(componentModel = "spring")
public interface TransactionMapper {

    Transaction toDomain(TransactionEntity entity);

    TransactionEntity toEntity(Transaction domain);
} 
