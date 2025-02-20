package digital.ebank.financial.services.rate.infrastructure.adapter.in.rest;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import digital.ebank.financial.services.common.domain.model.Rate;
import digital.ebank.financial.services.common.domain.model.Transaction.TransactionType;
import digital.ebank.financial.services.rate.application.port.in.CreateRateUseCase;
import digital.ebank.financial.services.rate.application.port.in.GetRateUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import lombok.Value;

@RestController
@RequestMapping("/api/v1/rates")
@RequiredArgsConstructor
@Tag(name = "Rate", description = "Rate management endpoints")
public class RateController {

	private final CreateRateUseCase createRateUseCase;
	private final GetRateUseCase getRateUseCase;
	
    @PostMapping
    @Operation(summary = "Create a new rate")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Rate created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid request")
    })
    public ResponseEntity<RateResponse> create(@Valid @RequestBody CreateRateRequest request) {
        CreateRateUseCase.CreateRateCommand command = new CreateRateUseCase.CreateRateCommand(
        		request.getRate(),
        		request.getType(),
        		request.getDescription()
        );
    	
        // save transaction
        Rate rate = createRateUseCase.createRate(command);

        return ResponseEntity.ok(RateResponse.from(rate));
    }
    
    
    @GetMapping("/{id}")
	@Operation(summary = "Get rate by ID")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Rate found"),
			@ApiResponse(responseCode = "404", description = "Rate not found") })
	public ResponseEntity<RateResponse> get(@PathVariable Long id) {
		GetRateUseCase.GetRateCommand command = new GetRateUseCase.GetRateCommand(id);
    	
		return ResponseEntity.ok(RateResponse.from(getRateUseCase.getRate(command)));
	}
    
    @GetMapping("/all") // this endpoint is not added to swagger documentation because should be used by an automation
    public ResponseEntity<Set<RateResponse>> all() {
        GetRateUseCase.GetAllRatesForAutomationCommand command = new GetRateUseCase.GetAllRatesForAutomationCommand();
        
        return ResponseEntity.ok(
                getRateUseCase.getAllRatesForAutomation(command).stream()
                    .map(RateResponse::from)
                    .collect(Collectors.toSet())
        );
    }
    
	@GetMapping
	@Operation(summary = "List rates", description = """
			Retrieves a paginated list of rates.

			Request example:
			{
			  "page": {
			    "number": 1,
			    "size": 20,
			    "sort": [
			      {
			        "property": "createdAt",
			        "direction": "ASC"
			      }
			    ]
			  }
			}

			Note: While the example shows a JSON structure, the actual request uses URL parameters:
			/api/v1/rates?page=1&size=20&sort=createdAt,asc
			""")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "rates retrieved successfully") })
	public ResponseEntity<Page<RateResponse>> list(
			@RequestParam(required = false) @Parameter(description = "Rate type filter") TransactionType type,
			@RequestParam(required = false) @Parameter(description = "Rate description filter") String description,
			@PageableDefault(size = 20, sort = "createdAt") 
			@Parameter(description = "Pagination and sorting parameters", schema = @Schema(example = """
					{
					  "page": {
					    "number": 1,
					    "size": 20,
					    "sort": [
					      {
					        "property": "createdAt",
					        "direction": "ASC"
					      }
					    ]
					  }
					}
					""")) Pageable pageable) {

		GetRateUseCase.GetAllRatesCommand command = new GetRateUseCase.GetAllRatesCommand(pageable, type, description);
		return ResponseEntity.ok(getRateUseCase.getAllRates(command).map(RateResponse::from));
	}
    
    
    @Value
    static class RateResponse {
    	Long id;
    	TransactionType type;
    	BigDecimal rate;
    	String description;
    	Boolean active;
    	LocalDateTime createdAt;
     
        static RateResponse from(Rate rate) {
            return new RateResponse(
            	rate.getId(),
            	rate.getType(),
            	rate.getRate(),
            	rate.getDescription(),
            	rate.getActive(),
            	rate.getCreatedAt()
            );
        }
    }
    
    @Value
    static class CreateRateRequest {
        
    	@Parameter(description = "Transaction type (DEPOSIT, WITHDRAWAL, TRANSFER, PAYMENT)")
    	@Schema(description = "Transaction type", allowableValues = {"DEPOSIT", "WITHDRAWAL", "TRANSFER", "PAYMENT"}, example = "DEPOSIT")
    	@NotNull(message = "Rate Type is required")
        TransactionType type;

    	@Parameter(description = "Rate amount")
        @NotNull(message = "Transaction rate is required")
        @DecimalMin(value = "0.01", message = "Percentage rate must be at least 0.01%")
        @Digits(integer = 3, fraction = 2, message = "Invalid format (max 3 digits and 2 decimal places)")
        BigDecimal rate;
        
    	@Parameter(description = "Rate description")
        @NotBlank(message = "Description is required")
        @Size(min = 2, max = 100, message = "Description must be between 2 and 100 characters")
        String description;
    }
    
}
