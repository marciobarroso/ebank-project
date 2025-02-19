package digital.ebank.financial.services.transaction;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import org.springframework.scheduling.annotation.EnableScheduling;

import digital.ebank.financial.services.common.config.CommonExceptionConfig;

@EnableScheduling
@SpringBootApplication
@Import(CommonExceptionConfig.class)
public class EbankTransactionServicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(EbankTransactionServicesApplication.class, args);
	}
	
}
