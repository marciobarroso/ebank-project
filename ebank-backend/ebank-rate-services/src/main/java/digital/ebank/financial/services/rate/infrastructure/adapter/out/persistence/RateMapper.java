package digital.ebank.financial.services.rate.infrastructure.adapter.out.persistence;

import org.mapstruct.Mapper;

import digital.ebank.financial.services.common.domain.model.Rate;

@Mapper(componentModel = "spring")
public interface RateMapper {

    Rate toDomain(RateEntity entity);

    RateEntity toEntity(Rate domain);
    
} 
