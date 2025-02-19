package digital.ebank.financial.services.common.config;

import java.io.File;

import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;

@Configuration
public class LoggingConfig {
    
    @PostConstruct
    public void init() {
        File logDirectory = new File("logs");
        if (!logDirectory.exists()) {
            logDirectory.mkdirs();
        }
    }
} 
