package digital.ebank.financial.services.user.application.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import digital.ebank.financial.services.common.domain.model.User;
import digital.ebank.financial.services.user.application.exception.UserException;
import digital.ebank.financial.services.user.application.port.in.CreateUserUseCase.CreateUserCommand;
import digital.ebank.financial.services.user.application.port.out.UserRepository;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Nested
    @DisplayName("Create User Tests")
    class CreateUserTests {
        
        @Test
        @DisplayName("Should create user successfully")
        void shouldCreateUserSuccessfully() {
            // Arrange
            CreateUserCommand command = new CreateUserCommand(
                "John Doe",
                "john.doe@example.com",
                "Password1!"
            );
            
            User expectedUser = User.builder()
                .id(1L)
                .name(command.getName())
                .email(command.getEmail())
                .password(command.getPassword())
                .createdAt(LocalDateTime.now())
                .build();
                
            when(userRepository.existsByEmail(command.getEmail())).thenReturn(false);
            when(userRepository.save(any(User.class))).thenReturn(expectedUser);
            
            // Act
            User createdUser = userService.createUser(command);
            
            // Assert
            assertNotNull(createdUser);
            assertEquals(expectedUser.getName(), createdUser.getName());
            assertEquals(expectedUser.getEmail(), createdUser.getEmail());
        }
        
        @Test
        @DisplayName("Should throw exception when email already exists")
        void shouldThrowExceptionWhenEmailExists() {
            // Arrange
            CreateUserCommand command = new CreateUserCommand(
                "John Doe",
                "existing@example.com",
                "Password1!"
            );
            
            when(userRepository.existsByEmail(command.getEmail())).thenReturn(true);
            
            // Act & Assert
            UserException exception = assertThrows(UserException.class,
                () -> userService.createUser(command));
                
            assertEquals(UserException.EMAIL_ALREADY_EXISTS, exception.getCode());
        }
        
        @Test
        @DisplayName("Should throw exception when name is invalid")
        void shouldThrowExceptionWhenNameIsInvalid() {
            // Arrange
            CreateUserCommand command = new CreateUserCommand(
                "Jo", // too short
                "john.doe@example.com",
                "Password1!"
            );
            
            // Act & Assert
            UserException exception = assertThrows(UserException.class,
                () -> userService.createUser(command));
                
            assertEquals(UserException.INVALID_NAME_FORMAT, exception.getCode());
        }
        
        @Test
        @DisplayName("Should throw exception when email format is invalid")
        void shouldThrowExceptionWhenEmailIsInvalid() {
            // Arrange
            CreateUserCommand command = new CreateUserCommand(
                "John Doe",
                "invalid-email", // invalid email format
                "Password1!"
            );
            
            // Act & Assert
            UserException exception = assertThrows(UserException.class,
                () -> userService.createUser(command));
                
            assertEquals(UserException.INVALID_EMAIL_FORMAT, exception.getCode());
        }
        
        @Test
        @DisplayName("Should throw exception when password format is invalid")
        void shouldThrowExceptionWhenPasswordIsInvalid() {
            // Arrange
            CreateUserCommand command = new CreateUserCommand(
                "John Doe",
                "john.doe@example.com",
                "weak" // invalid password format
            );
            
            // Act & Assert
            UserException exception = assertThrows(UserException.class,
                () -> userService.createUser(command));
                
            assertEquals(UserException.INVALID_PASSWORD_FORMAT, exception.getCode());
        }
    }
} 
