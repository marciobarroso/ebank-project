package digital.ebank.financial.services.user;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

import digital.ebank.financial.services.common.config.CommonExceptionConfig;

@SpringBootApplication
@Import(CommonExceptionConfig.class)
public class EbankUserServicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(EbankUserServicesApplication.class, args);
	}
	
}
