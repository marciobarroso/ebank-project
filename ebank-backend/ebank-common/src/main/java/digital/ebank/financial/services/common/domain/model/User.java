package digital.ebank.financial.services.common.domain.model;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
	private Long id;
	private String name;
	private String email;
	private String password;
	private LocalDateTime createdAt;
}
