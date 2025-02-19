package digital.ebank.financial.services.transaction.infrastructure.adapter.in.rest;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.NumberFormat;
import org.springframework.format.annotation.NumberFormat.Style;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import digital.ebank.financial.services.common.domain.model.Transaction;
import digital.ebank.financial.services.common.domain.model.Transaction.TransactionStatus;
import digital.ebank.financial.services.common.domain.model.Transaction.TransactionType;
import digital.ebank.financial.services.transaction.application.port.in.CreateTransactionUseCase;
import digital.ebank.financial.services.transaction.application.port.in.GetTransactionUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.Value;

@RestController
@RequestMapping("/api/v1/transactions")
@RequiredArgsConstructor
@Tag(name = "Transaction", description = "Transaction management endpoints")
public class TransactionController {

	private final CreateTransactionUseCase createTransactionUseCase;
	private final GetTransactionUseCase getTransactionUseCase;

	@PostMapping
	@Operation(summary = "Create a new transaction")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Transaction created successfully"),
			@ApiResponse(responseCode = "400", description = "Invalid request") })
	public ResponseEntity<TransactionResponse> createTransaction(@Valid @RequestBody CreateTransactionRequest request) {
		CreateTransactionUseCase.CreateTransactionCommand command = new CreateTransactionUseCase.CreateTransactionCommand(
				request.getAmount(), request.getType());

		// save transaction
		Transaction transaction = createTransactionUseCase.createTransaction(command);

		return ResponseEntity.ok(TransactionResponse.from(transaction));
	}

	@GetMapping("/{id}")
	@Operation(summary = "Get transaction by ID")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Transaction found"),
			@ApiResponse(responseCode = "404", description = "Transaction not found") })
	public ResponseEntity<TransactionResponse> getTransaction(@PathVariable Long id) {
		GetTransactionUseCase.GetTransactionCommand command = new GetTransactionUseCase.GetTransactionCommand(id);

		return getTransactionUseCase.getTransaction(command)
				.map(transaction -> ResponseEntity.ok(TransactionResponse.from(transaction)))
				.orElse(ResponseEntity.notFound().build());
	}

	@GetMapping
	@Operation(summary = "List transactions", description = """
			Retrieves a paginated list of transactions.

			Request example:
			/api/v1/transactions?page=1&size=20&sort=amount,asc&type=DEPOSIT
			""")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Transactions retrieved successfully") })
	public ResponseEntity<Page<TransactionResponse>> listTransactions(
			@PageableDefault(size = 10) @Parameter(description = "Pagination and sorting parameters") Pageable pageable,
			@Parameter(description = "Transaction type filter") @RequestParam(required = false) TransactionType type) {

		GetTransactionUseCase.GetAllTransactionsCommand command = new GetTransactionUseCase.GetAllTransactionsCommand(
				pageable, type);
		return ResponseEntity.ok(getTransactionUseCase.getAllTransactions(command).map(TransactionResponse::from));
	}

	@Value
	static class TransactionResponse {
		Long id;
		TransactionType type;
		BigDecimal amount;
		BigDecimal calculatedFee;
		TransactionStatus status;
		LocalDateTime createdAt;
		String feeCalculationMetadata;
		LocalDateTime feeCalculatedAt;

		static TransactionResponse from(Transaction transaction) {
			return new TransactionResponse(transaction.getId(), transaction.getType(), transaction.getAmount(),
					transaction.getCalculatedFee(), transaction.getStatus(), transaction.getCreatedAt(), transaction.getFeeCalculationMetadata(), transaction.getFeeCalculatedAt());
		}
	}

	@Value
	static class CreateTransactionRequest {
		@NotNull(message = "Transaction Type is required")
		TransactionType type;

		@NotNull(message = "Transaction amount is required")
		@DecimalMin(value = "0.01", message = "The amount must be greater than zero")
		@NumberFormat(style = Style.CURRENCY)
		@Digits(integer = 10, fraction = 2, message = "Invalid amount format (max 10 integer digits and 2 decimal places)")
		BigDecimal amount;
	}

}
