package com.bookfair.system.dto.request;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UpdateStallRequest {
    @Pattern(regexp = "^[A-Z0-9-]*$", message = "Stall code contains invalid characters")
    @Size(max = 20, message = "Stall code is too long")
    private String code; // optional

    @Pattern(regexp = "^(SMALL|MEDIUM|LARGE)?$", message = "Size must be SMALL, MEDIUM, or LARGE")
    private String size; // optional

    @Pattern(regexp = "^(AVAILABLE|RESERVED)?$", message = "Status must be AVAILABLE or RESERVED")
    private String status; // AVAILABLE / RESERVED (optional)

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}