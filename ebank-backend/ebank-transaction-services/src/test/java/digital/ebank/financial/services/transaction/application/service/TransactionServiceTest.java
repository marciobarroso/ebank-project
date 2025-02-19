package digital.ebank.financial.services.transaction.application.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import digital.ebank.financial.services.common.domain.model.Rate;
import digital.ebank.financial.services.common.domain.model.Transaction;
import digital.ebank.financial.services.common.domain.model.Transaction.TransactionStatus;
import digital.ebank.financial.services.common.domain.model.Transaction.TransactionType;
import digital.ebank.financial.services.transaction.application.port.in.CreateTransactionUseCase.CreateTransactionCommand;
import digital.ebank.financial.services.transaction.application.port.in.GetTransactionUseCase.GetAllTransactionsCommand;
import digital.ebank.financial.services.transaction.application.port.in.GetTransactionUseCase.GetTransactionCommand;
import digital.ebank.financial.services.transaction.application.port.out.TransactionRepository;
import digital.ebank.financial.services.transaction.infrastructure.adapter.out.rest.RateServiceAdapter;

@ExtendWith(MockitoExtension.class)
class TransactionServiceTest {

    @Mock
    private TransactionRepository transactionRepository;
    
    @Mock
    private RateServiceAdapter rateServiceAdapter;

    @InjectMocks
    private TransactionService transactionService;

    @Nested
    @DisplayName("Create Transaction Tests")
    class CreateTransactionTests {
        
        @Test
        @DisplayName("Should create transaction successfully")
        void shouldCreateTransactionSuccessfully() {
            // Arrange
            CreateTransactionCommand command = new CreateTransactionCommand(
                new BigDecimal("100.00"),
                TransactionType.DEPOSIT
            );
            
            Transaction expectedTransaction = Transaction.builder()
                .id(1L)
                .amount(command.getAmount())
                .type(command.getType())
                .status(TransactionStatus.PENDING)
                .calculatedFee(BigDecimal.ZERO)
                .createdAt(LocalDateTime.now())
                .build();
                
            when(transactionRepository.save(any(Transaction.class))).thenReturn(expectedTransaction);
            
            // Act
            Transaction createdTransaction = transactionService.createTransaction(command);
            
            // Assert
            assertNotNull(createdTransaction);
            assertEquals(expectedTransaction.getAmount(), createdTransaction.getAmount());
            assertEquals(expectedTransaction.getType(), createdTransaction.getType());
            assertEquals(TransactionStatus.PENDING, createdTransaction.getStatus());
            assertEquals(BigDecimal.ZERO, createdTransaction.getCalculatedFee());
        }
    }
    
    @Nested
    @DisplayName("Get Transaction Tests")
    class GetTransactionTests {
        
        @Test
        @DisplayName("Should get transaction by id successfully")
        void shouldGetTransactionByIdSuccessfully() {
            // Arrange
            Long transactionId = 1L;
            Transaction expectedTransaction = Transaction.builder()
                .id(transactionId)
                .amount(new BigDecimal("100.00"))
                .type(TransactionType.DEPOSIT)
                .status(TransactionStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();
                
            when(transactionRepository.findById(transactionId)).thenReturn(Optional.of(expectedTransaction));
            
            // Act
            Optional<Transaction> foundTransaction = transactionService.getTransaction(new GetTransactionCommand(transactionId));
            
            // Assert
            assertTrue(foundTransaction.isPresent());
            assertEquals(expectedTransaction.getId(), foundTransaction.get().getId());
        }
        
        @Test
        @DisplayName("Should get all transactions with pagination")
        void shouldGetAllTransactionsWithPagination() {
            // Arrange
            Pageable pageable = PageRequest.of(0, 10);
            TransactionType type = TransactionType.DEPOSIT;
            
            Transaction transaction = Transaction.builder()
                .id(1L)
                .amount(new BigDecimal("100.00"))
                .type(TransactionType.DEPOSIT)
                .status(TransactionStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();
                
            Page<Transaction> expectedPage = new PageImpl<>(java.util.List.of(transaction));
            when(transactionRepository.findByType(pageable, type)).thenReturn(expectedPage);
            
            // Act
            Page<Transaction> resultPage = transactionService.getAllTransactions(
                new GetAllTransactionsCommand(pageable, type));
            
            // Assert
            assertNotNull(resultPage);
            assertFalse(resultPage.getContent().isEmpty());
            assertEquals(1, resultPage.getContent().size());
            assertEquals(type, resultPage.getContent().get(0).getType());
        }
    }
    
    @Nested
    @DisplayName("Process Pending Transactions Tests")
    class ProcessPendingTransactionsTests {
        
        @Test
        @DisplayName("Should process pending transactions successfully")
        void shouldProcessPendingTransactionsSuccessfully() {
            // Arrange
            Transaction pendingTransaction = Transaction.builder()
                .id(1L)
                .amount(new BigDecimal("100.00"))
                .type(TransactionType.DEPOSIT)
                .status(TransactionStatus.PENDING)
                .calculatedFee(BigDecimal.ZERO)
                .createdAt(LocalDateTime.now())
                .build();
                
            Rate rate = Rate.builder()
                .id(1L)
                .rate(new BigDecimal("0.05"))
                .type(TransactionType.DEPOSIT)
                .description("Standard deposit rate")
                .active(true)
                .createdAt(LocalDateTime.now())
                .build();
                
            when(transactionRepository.findByStatusPending()).thenReturn(Set.of(pendingTransaction));
            when(rateServiceAdapter.getAllRates()).thenReturn(Set.of(rate));
            
            ArgumentCaptor<Transaction> transactionCaptor = ArgumentCaptor.forClass(Transaction.class);
            when(transactionRepository.save(transactionCaptor.capture())).thenReturn(pendingTransaction);
            
            // Act
            transactionService.getPendingTransactionsAndCalculateFees();
            
            // Verify
            Transaction savedTransaction = transactionCaptor.getValue();
            assertNotNull(savedTransaction);
            assertEquals(TransactionStatus.PROCESSED, savedTransaction.getStatus());
            
            // Compare with same scale
            BigDecimal expectedFee = new BigDecimal("5.0000");
            assertEquals(expectedFee, savedTransaction.getCalculatedFee());
            
            assertNotNull(savedTransaction.getFeeCalculationMetadata());
            assertNotNull(savedTransaction.getFeeCalculatedAt());
            verify(transactionRepository, times(1)).save(any(Transaction.class));
        }
        
        @Test
        @DisplayName("Should handle transaction with no applicable rates")
        void shouldHandleTransactionWithNoApplicableRates() {
            // Arrange
            Transaction pendingTransaction = Transaction.builder()
                .id(1L)
                .amount(new BigDecimal("100.00"))
                .type(TransactionType.DEPOSIT)
                .status(TransactionStatus.PENDING)
                .calculatedFee(BigDecimal.ZERO)
                .createdAt(LocalDateTime.now())
                .build();
                
            when(transactionRepository.findByStatusPending()).thenReturn(Set.of(pendingTransaction));
            when(rateServiceAdapter.getAllRates()).thenReturn(Set.of()); // No rates available
            
            ArgumentCaptor<Transaction> transactionCaptor = ArgumentCaptor.forClass(Transaction.class);
            when(transactionRepository.save(transactionCaptor.capture())).thenReturn(pendingTransaction);
            
            // Act
            transactionService.getPendingTransactionsAndCalculateFees();
            
            // Verify
            Transaction savedTransaction = transactionCaptor.getValue();
            assertNotNull(savedTransaction);
            assertEquals(TransactionStatus.PROCESSED, savedTransaction.getStatus());
            assertEquals(BigDecimal.ZERO, savedTransaction.getCalculatedFee());
            assertNotNull(savedTransaction.getFeeCalculationMetadata());
            verify(transactionRepository, times(1)).save(any(Transaction.class));
        }
    }
} 
