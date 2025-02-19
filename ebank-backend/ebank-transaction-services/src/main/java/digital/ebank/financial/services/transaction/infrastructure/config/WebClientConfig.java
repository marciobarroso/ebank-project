package digital.ebank.financial.services.transaction.infrastructure.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Value("${services.rate.url}")
    private String rateServiceUrl;

    @Bean
    public WebClient rateServiceWebClient() {
        return WebClient.builder()
            .baseUrl(rateServiceUrl)
            .build();
    }
} 