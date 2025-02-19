package digital.ebank.financial.services.user.application.port.in;

import digital.ebank.financial.services.common.domain.model.User;
import lombok.Value;

public interface CreateUserUseCase {
	
	User createUser(CreateUserCommand command);

	@Value
	class CreateUserCommand {
		String name;
		String email;
		String password;
	}
}
