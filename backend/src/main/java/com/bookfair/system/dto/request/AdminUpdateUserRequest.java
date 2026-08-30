package com.bookfair.system.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AdminUpdateUserRequest {
    @Size(max = 100, message = "Name must be under 100 characters")
    private String name;

    @Email(message = "Please provide a valid email address")
    private String email;

    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Contact number must be a valid format (10-15 digits)")
    private String contactNumber;

    @Size(max = 100, message = "Business name must be under 100 characters")
    private String businessName;

    @Pattern(regexp = "^(VENDOR|EMPLOYEE|ADMIN)?$", message = "Role must be one of VENDOR, EMPLOYEE, or ADMIN")
    private String role; // VENDOR, EMPLOYEE, ADMIN

    @Size(min = 8, max = 128, message = "Password must be between 8 and 128 characters")
    private String password; // Optional — only re-hashed if non-empty
    private Boolean enabled;
}
