package com.bookfair.system.dto.request;

import lombok.Data;

@Data
public class GoogleProfileRequest {
    private String auth0Sub;
    private String email;
    private String name;
    private String contactNumber;
    private String businessName;
}
