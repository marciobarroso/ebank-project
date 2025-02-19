package digital.ebank.financial.services.user.application.service;

import java.time.LocalDateTime;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import digital.ebank.financial.services.common.domain.model.User;
import digital.ebank.financial.services.user.application.exception.UserException;
import digital.ebank.financial.services.user.application.port.in.CreateUserUseCase;
import digital.ebank.financial.services.user.application.port.out.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements CreateUserUseCase {

	private final UserRepository userRepository;
	
	private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");
	private static final Pattern PASSWORD_PATTERN = Pattern
			.compile("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$");
	
	@Override
	@Transactional
	public User createUser(CreateUserCommand command) {
		validateName(command.getName());
		validatePassword(command.getPassword());
		validateEmail(command.getEmail());

		if (userRepository.existsByEmail(command.getEmail())) {
			throw new UserException(
				UserException.EMAIL_ALREADY_EXISTS,
				"Email " + command.getEmail() + " is already registered"
			);
		}

		User user = User.builder()
				.name(command.getName())
				.email(command.getEmail())
				.password(command.getPassword()) //@TODO: encrypt the password
				.createdAt(LocalDateTime.now())
				.build();

		return userRepository.save(user);
	}
	
	private void validateName(String name) {
		if (name == null || name.trim().isEmpty()) {
			throw new UserException(
				UserException.INVALID_NAME_FORMAT,
				"Name cannot be empty"
			);
		}
		if (name.length() < 3) {
			throw new UserException(
				UserException.INVALID_NAME_FORMAT,
				"Name must be at least 3 characters long"
			);
		}
	}

	private void validateEmail(String email) {
		if (email == null || email.trim().isEmpty()) {
			throw new UserException(
				UserException.INVALID_EMAIL_FORMAT,
				"Email cannot be empty"
			);
		}
		if (!EMAIL_PATTERN.matcher(email).matches()) {
			throw new UserException(
				UserException.INVALID_EMAIL_FORMAT,
				"Invalid email format"
			);
		}
	}

	private void validatePassword(String password) {
		if (password == null || password.trim().isEmpty()) {
			throw new UserException(
				UserException.INVALID_PASSWORD_FORMAT,
				"Password cannot be empty"
			);
		}
		if (!PASSWORD_PATTERN.matcher(password).matches()) {
			throw new UserException(
				UserException.INVALID_PASSWORD_FORMAT,
				"Password must be at least 8 characters long and contain at least one digit, " +
				"one lowercase letter, one uppercase letter, and one special character"
			);
		}
	}

}
