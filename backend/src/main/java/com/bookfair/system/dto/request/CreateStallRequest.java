package com.bookfair.system.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class CreateStallRequest {
    @NotBlank(message = "Stall code is required")
    @Pattern(regexp = "^[A-Z0-9-]+$", message = "Stall code contains invalid characters")
    @Size(max = 20, message = "Stall code is too long")
    private String code; // A1, B1 etc

    @NotBlank(message = "Stall size is required")
    @Pattern(regexp = "^(SMALL|MEDIUM|LARGE)$", message = "Size must be SMALL, MEDIUM, or LARGE")
    private String size; // SMALL / MEDIUM / LARGE

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }
}