package digital.ebank.financial.services.rate.application.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import digital.ebank.financial.services.common.domain.model.Rate;
import digital.ebank.financial.services.common.domain.model.Transaction.TransactionType;
import digital.ebank.financial.services.rate.application.exception.RateException;
import digital.ebank.financial.services.rate.application.port.in.CreateRateUseCase.CreateRateCommand;
import digital.ebank.financial.services.rate.application.port.in.GetRateUseCase.GetAllRatesCommand;
import digital.ebank.financial.services.rate.application.port.in.GetRateUseCase.GetRateCommand;
import digital.ebank.financial.services.rate.application.port.out.RateRepository;

@ExtendWith(MockitoExtension.class)
class RateServiceTest {

    @Mock
    private RateRepository rateRepository;

    @InjectMocks
    private RateService rateService;

    @Nested
    @DisplayName("Create Rate Tests")
    class CreateRateTests {
        
        @Test
        @DisplayName("Should create rate successfully")
        void shouldCreateRateSuccessfully() {
            // Arrange
            CreateRateCommand command = new CreateRateCommand(
                new BigDecimal("0.05"),
                TransactionType.DEPOSIT,
                "Standard deposit rate"
            );
            
            Rate expectedRate = Rate.builder()
                .id(1L)
                .rate(command.getRate())
                .type(command.getType())
                .description(command.getDescription())
                .active(true)
                .createdAt(LocalDateTime.now())
                .build();
                
            when(rateRepository.save(any(Rate.class))).thenReturn(expectedRate);
            
            // Act
            Rate createdRate = rateService.createRate(command);
            
            // Assert
            assertNotNull(createdRate);
            assertEquals(expectedRate.getRate(), createdRate.getRate());
            assertEquals(expectedRate.getType(), createdRate.getType());
            assertTrue(createdRate.getActive());
        }
    }
    
    @Nested
    @DisplayName("Get Rate Tests")
    class GetRateTests {
        
        @Test
        @DisplayName("Should get rate by id successfully")
        void shouldGetRateByIdSuccessfully() {
            // Arrange
            Long rateId = 1L;
            Rate expectedRate = Rate.builder()
                .id(rateId)
                .rate(new BigDecimal("0.05"))
                .type(TransactionType.DEPOSIT)
                .description("Standard deposit rate")
                .active(true)
                .createdAt(LocalDateTime.now())
                .build();
                
            when(rateRepository.findById(rateId)).thenReturn(Optional.of(expectedRate));
            
            // Act
            Rate foundRate = rateService.getRate(new GetRateCommand(rateId));
            
            // Assert
            assertNotNull(foundRate);
            assertEquals(expectedRate.getId(), foundRate.getId());
        }
        
        @Test
        @DisplayName("Should throw exception when rate not found")
        void shouldThrowExceptionWhenRateNotFound() {
            // Arrange
            Long rateId = 999L;
            when(rateRepository.findById(rateId)).thenReturn(Optional.empty());
            
            // Act & Assert
            RateException exception = assertThrows(RateException.class,
                () -> rateService.getRate(new GetRateCommand(rateId)));
                
            assertEquals(RateException.RATE_NOT_FOUND, exception.getCode());
        }
        
        @Test
        @DisplayName("Should get all rates with pagination")
        void shouldGetAllRatesWithPagination() {
            // Arrange
            Pageable pageable = PageRequest.of(0, 10);
            Rate rate = Rate.builder()
                .id(1L)
                .rate(new BigDecimal("0.05"))
                .type(TransactionType.DEPOSIT)
                .description("Standard deposit rate")
                .active(true)
                .createdAt(LocalDateTime.now())
                .build();
                
            Page<Rate> expectedPage = new PageImpl<>(java.util.List.of(rate));
            when(rateRepository.findAll(pageable)).thenReturn(expectedPage);
            
            // Act
            Page<Rate> resultPage = rateService.getAllRates(new GetAllRatesCommand(pageable, null, null));
            
            // Assert
            assertNotNull(resultPage);
            assertFalse(resultPage.getContent().isEmpty());
            assertEquals(1, resultPage.getContent().size());
        }
        
        @Test
        @DisplayName("Should get all active rates for automation")
        void shouldGetAllActiveRatesForAutomation() {
            // Arrange
            Rate rate = Rate.builder()
                .id(1L)
                .rate(new BigDecimal("0.05"))
                .type(TransactionType.DEPOSIT)
                .description("Standard deposit rate")
                .active(true)
                .createdAt(LocalDateTime.now())
                .build();
                
            when(rateRepository.findByActiveTrue()).thenReturn(Set.of(rate));
            
            // Act
            Set<Rate> activeRates = rateService.getAllRatesForAutomation(null);
            
            // Assert
            assertNotNull(activeRates);
            assertFalse(activeRates.isEmpty());
            assertEquals(1, activeRates.size());
        }
    }
} 