package com.bookfair.system.controller;

import com.bookfair.system.dto.UserProfileResponse;
import com.bookfair.system.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  @GetMapping("/me")
  public ResponseEntity<UserProfileResponse> getCurrentUser(
      Principal principal,
      @RequestParam(required = false) String auth0Sub,
      @RequestParam(required = false) String email) {
    if (principal != null) {
      return ResponseEntity.ok(userService.getUserProfile(principal.getName()));
    }
    if ((auth0Sub != null && !auth0Sub.isBlank()) || (email != null && !email.isBlank())) {
      return ResponseEntity.ok(userService.getUserProfileBySubOrEmail(auth0Sub, email));
    }
    return ResponseEntity.badRequest().build();
  }

  @GetMapping("/profile")
  public ResponseEntity<UserProfileResponse> getUserProfile(Principal principal) {
    String email = principal.getName();
    UserProfileResponse userProfile = userService.getUserProfile(email);
    return ResponseEntity.ok(userProfile);
  }

  @PostMapping("/me/google")
  public ResponseEntity<UserProfileResponse> completeGoogleProfile(
      @RequestBody com.bookfair.system.dto.request.GoogleProfileRequest request) {
    if (request == null || (request.getEmail() == null && request.getAuth0Sub() == null)) {
      return ResponseEntity.badRequest().build();
    }
    UserProfileResponse userProfile = userService.completeGoogleProfile(
        request.getAuth0Sub(), request.getEmail(), request.getName(),
        request.getContactNumber(), request.getBusinessName());
    return ResponseEntity.ok(userProfile);
  }

  @PutMapping("/profile")
  public ResponseEntity<UserProfileResponse> updateProfile(Principal principal,
      @RequestBody com.bookfair.system.dto.request.UserProfileUpdateRequest request) {
    String email = principal.getName();
    UserProfileResponse userProfile = userService.updateProfile(email, request);
    return ResponseEntity.ok(userProfile);
  }

  @PostMapping("/change-password")
  public ResponseEntity<?> changePassword(Principal principal,
      @Valid @RequestBody com.bookfair.system.dto.request.ChangePasswordRequest request) {
    String email = principal.getName();
    userService.changePassword(email, request);
    return ResponseEntity.ok("Password changed successfully");
  }
}
