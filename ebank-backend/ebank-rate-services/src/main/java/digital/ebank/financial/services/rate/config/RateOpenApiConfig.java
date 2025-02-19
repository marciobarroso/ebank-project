package digital.ebank.financial.services.rate.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class RateOpenApiConfig {

    @Bean
    public OpenAPI transactionServiceOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("E-Bank Rate Service API")
                .description("API for managing rates in the E-Bank system")
                .version("1.0.0")
                .contact(new Contact()
                    .name("E-Bank Team")
                    .email("support@ebank.digital")))
            .addServersItem(new Server()
                .url("http://localhost:8083")
                .description("Local Development Server"));
    }
} 
