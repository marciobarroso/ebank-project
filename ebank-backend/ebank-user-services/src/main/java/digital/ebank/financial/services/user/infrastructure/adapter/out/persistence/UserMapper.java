package digital.ebank.financial.services.user.infrastructure.adapter.out.persistence;

import org.mapstruct.Mapper;

import digital.ebank.financial.services.common.domain.model.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toDomain(UserEntity user);

    UserEntity toEntity(User user);
} 
