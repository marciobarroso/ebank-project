package digital.ebank.financial.services.user.application.port.out;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import digital.ebank.financial.services.common.domain.model.User;

public interface UserRepository {
	User save(User user);
	Optional<User> findById(Long id);
	Optional<User> findByEmail(String email);
	boolean existsByEmail(String email);
	boolean existsById(Long id);
	Page<User> findAll(Pageable pageable);
}
