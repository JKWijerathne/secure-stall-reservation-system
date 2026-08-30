package com.bookfair.system.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class GoogleProfileRequest {
    @NotBlank(message = "Auth0 subject is required")
    @Size(max = 255, message = "Auth0 subject is too long")
    private String auth0Sub;

    @Email(message = "Please provide a valid email address")
    @Size(max = 255, message = "Email is too long")
    private String email;

    @Size(max = 100, message = "Name must be under 100 characters")
    private String name;

    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Contact number must be a valid format (10-15 digits)")
    private String contactNumber;

    @Size(max = 100, message = "Business name must be under 100 characters")
    private String businessName;
}
