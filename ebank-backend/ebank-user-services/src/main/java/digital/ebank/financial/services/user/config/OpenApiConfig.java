package digital.ebank.financial.services.user.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI userServiceOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("E-Bank User Service API")
                .description("API for managing users in the E-Bank system")
                .version("1.0.0")
                .contact(new Contact()
                    .name("E-Bank Team")
                    .email("support@ebank.digital")))
            .addServersItem(new Server()
                .url("http://localhost:8081")
                .description("Local Development Server"));
    }
} 
