package digital.ebank.financial.services.rate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

import digital.ebank.financial.services.common.config.CommonExceptionConfig;

@SpringBootApplication
@Import(CommonExceptionConfig.class)
public class EbankRateServicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(EbankRateServicesApplication.class, args);
	}
	
}
