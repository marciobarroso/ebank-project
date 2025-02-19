package digital.ebank.financial.services.common.domain.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Pagination request")
public class PageableRequest {

    @Schema(description = "Page number (0-based)", example = "0")
    private Integer page;

    @Schema(description = "Page size", example = "10")
    private Integer size;

    @Schema(description = "Sorting criteria", example = "[\"name,asc\", \"createdAt,desc\"]")
    private String[] sort;
}
