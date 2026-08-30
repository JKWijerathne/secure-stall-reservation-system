package com.bookfair.system.controller.vendor_and_publishers;

import com.bookfair.system.dto.request.ReservationRequest;
import com.bookfair.system.dto.response.AdminReservationResponse;
import com.bookfair.system.dto.response.ReservationResponse;
import com.bookfair.system.service.ReservationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping({"/api/reservations", "/api/vendor-publishers/reservations"})
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping
    @PreAuthorize("hasRole('VENDOR')")
    public ResponseEntity<?> createReservation(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody ReservationRequest request) {
        try {
            String auth0Sub = jwt.getSubject();
            log.info("security.role_action action=createReservation subject={} role=VENDOR", auth0Sub);
            ReservationResponse response = reservationService.createReservation(auth0Sub, request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/count")
    @PreAuthorize("hasRole('VENDOR')")
    public ResponseEntity<Long> getReservationCount(@AuthenticationPrincipal Jwt jwt) {
        String auth0Sub = jwt.getSubject();
        return ResponseEntity.ok((long) reservationService.findReservationsByAuth0Sub(auth0Sub).size());
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('VENDOR')")
    public ResponseEntity<List<ReservationResponse>> getMyReservations(@AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.ok(reservationService.getMyReservations(jwt.getSubject()));
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ORGANIZER')")
    public ResponseEntity<List<AdminReservationResponse>> getAllReservations() {
        return ResponseEntity.ok(reservationService.getAllReservations());
    }

    @DeleteMapping("/{stallId}")
    @PreAuthorize("hasRole('VENDOR')")
    public ResponseEntity<?> cancelReservation(@AuthenticationPrincipal Jwt jwt,
            @PathVariable Long stallId) {
        try {
            reservationService.cancelStallReservationByAuth0Sub(jwt.getSubject(), stallId);
            return ResponseEntity.ok("Reservation cancelled successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}