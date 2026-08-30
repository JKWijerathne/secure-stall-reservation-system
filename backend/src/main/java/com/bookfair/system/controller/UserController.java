package com.bookfair.system.controller;

import com.bookfair.system.dto.UserProfileResponse;
import com.bookfair.system.dto.request.GoogleProfileRequest;
import com.bookfair.system.dto.request.UserProfileUpdateRequest;
import com.bookfair.system.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  @GetMapping("/me")
  public ResponseEntity<UserProfileResponse> getCurrentUser(@AuthenticationPrincipal Jwt jwt) {
    if (jwt == null || jwt.getSubject() == null || jwt.getSubject().isBlank()) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok(userService.getUserProfileBySubOrEmail(jwt.getSubject(), null));
  }

  @GetMapping("/profile")
  public ResponseEntity<UserProfileResponse> getUserProfile(@AuthenticationPrincipal Jwt jwt) {
    if (jwt == null || jwt.getSubject() == null || jwt.getSubject().isBlank()) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok(userService.getUserProfileBySubOrEmail(jwt.getSubject(), null));
  }

  @PostMapping("/me/google")
  public ResponseEntity<UserProfileResponse> completeGoogleProfile(
      @Valid @RequestBody GoogleProfileRequest request) {
    if (request == null || (request.getEmail() == null && request.getAuth0Sub() == null)) {
      return ResponseEntity.badRequest().build();
    }
    UserProfileResponse userProfile = userService.completeGoogleProfile(
        request.getAuth0Sub(), request.getEmail(), request.getName(),
        request.getContactNumber(), request.getBusinessName());
    return ResponseEntity.ok(userProfile);
  }

  @PutMapping("/profile")
  public ResponseEntity<UserProfileResponse> updateProfile(@AuthenticationPrincipal Jwt jwt,
      @Valid @RequestBody UserProfileUpdateRequest request) {
    if (jwt == null || jwt.getSubject() == null || jwt.getSubject().isBlank()) {
      return ResponseEntity.badRequest().build();
    }
    UserProfileResponse userProfile = userService.updateProfile(jwt.getClaimAsString("email"), request);
    return ResponseEntity.ok(userProfile);
  }

  @PostMapping("/change-password")
  public ResponseEntity<?> changePassword(@AuthenticationPrincipal Jwt jwt,
      @Valid @RequestBody com.bookfair.system.dto.request.ChangePasswordRequest request) {
    if (jwt == null || jwt.getSubject() == null || jwt.getSubject().isBlank()) {
      return ResponseEntity.badRequest().build();
    }
    String email = jwt.getClaimAsString("email");
    if (email == null || email.isBlank()) {
      email = jwt.getSubject();
    }
    userService.changePassword(email, request);
    return ResponseEntity.ok("Password changed successfully");
  }
}
