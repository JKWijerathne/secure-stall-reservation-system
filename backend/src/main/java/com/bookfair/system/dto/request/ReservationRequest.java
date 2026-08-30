package com.bookfair.system.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.util.List;

@Data
public class ReservationRequest {
    @NotEmpty(message = "At least one stall must be selected")
    private List<Long> stallIds;

    @Pattern(regexp = "^(CASH_ON_DATE|CARD|BANK_TRANSFER|PAYPAL)$", message = "Unsupported payment method")
    @Size(max = 32, message = "Payment method is too long")
    private String paymentMethod;

    private Double totalAmount;
}