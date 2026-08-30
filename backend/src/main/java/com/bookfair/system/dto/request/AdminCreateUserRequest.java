package com.bookfair.system.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AdminCreateUserRequest {
    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must be under 100 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 128, message = "Password must be between 8 and 128 characters")
    private String password;

    @Pattern(regexp = "^(VENDOR|EMPLOYEE|ADMIN)$", message = "Role must be one of VENDOR, EMPLOYEE, or ADMIN")
    private String role; // VENDOR, EMPLOYEE, ADMIN

    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Contact number must be a valid format (10-15 digits)")
    private String contactNumber;

    @Size(max = 100, message = "Business name must be under 100 characters")
    private String businessName;
}
