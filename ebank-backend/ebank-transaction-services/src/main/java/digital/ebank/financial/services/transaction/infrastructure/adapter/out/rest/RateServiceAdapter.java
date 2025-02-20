package digital.ebank.financial.services.transaction.infrastructure.adapter.out.rest;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import digital.ebank.financial.services.common.domain.model.Rate;
import digital.ebank.financial.services.common.domain.model.Transaction.TransactionType;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class RateServiceAdapter {

    private final WebClient rateServiceWebClient;

    public Set<Rate> getAllRates() {
        try {
            return rateServiceWebClient.get()
                .uri("/api/v1/rates/all")
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Set<RateResponse>>() {})
                .map(rateResponses -> rateResponses.stream()
                    .map(RateResponse::toDomain)
                    .collect(Collectors.toSet()))
                .block();
        } catch (Exception e) {
            log.error("Error fetching rates from rate service", e);
            return Collections.emptySet();
        }
    }

    @Value
    static class RateResponse {
        Long id;
        TransactionType type;
        BigDecimal rate;
        String description;
        Boolean active;
        LocalDateTime createdAt;

        Rate toDomain() {
            return Rate.builder()
                .id(id)
                .type(type)
                .rate(rate)
                .description(description)
                .active(active)
                .createdAt(createdAt)
                .build();
        }
    }
} 
