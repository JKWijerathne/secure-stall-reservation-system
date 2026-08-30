package com.bookfair.system.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

  private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
    Map<String, String> errors = new HashMap<>();
    ex.getBindingResult().getAllErrors().forEach((error) -> {
      String fieldName = (error instanceof org.springframework.validation.FieldError fieldError)
          ? fieldError.getField() : "request";
      String errorMessage = error.getDefaultMessage();
      errors.put(fieldName, errorMessage);
    });
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
  }

  @ExceptionHandler(AccessDeniedException.class)
  public ResponseEntity<Map<String, String>> handleAccessDeniedException(AccessDeniedException ex) {
    log.warn("Forbidden access denied: {}", ex.getMessage());
    Map<String, String> error = new HashMap<>();
    error.put("error", "FORBIDDEN");
    error.put("message", "Access denied.");
    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
  }

  @ExceptionHandler(UsernameNotFoundException.class)
  public ResponseEntity<Map<String, String>> handleUsernameNotFoundException(UsernameNotFoundException ex) {
    Map<String, String> error = new HashMap<>();
    error.put("error", "USER_NOT_FOUND");
    error.put("message", "User not found.");
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
  }

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<Map<String, String>> handleIllegalArgumentException(IllegalArgumentException ex) {
    Map<String, String> error = new HashMap<>();
    error.put("error", "INVALID_REQUEST");
    error.put("message", "The request is invalid.");
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
  }

  @ExceptionHandler(org.springframework.http.converter.HttpMessageNotWritableException.class)
  public ResponseEntity<Map<String, String>> handleHttpMessageNotWritableException(
      org.springframework.http.converter.HttpMessageNotWritableException ex) {
    Throwable cause = ex.getCause();
    boolean isClientAbort = false;

    while (cause != null) {
      if (cause.getClass().getName().contains("ClientAbortException") ||
          (cause.getMessage() != null && cause.getMessage().contains("An established connection was aborted"))) {
        isClientAbort = true;
        break;
      }
      cause = cause.getCause();
    }

    if (isClientAbort) {
      log.info("Client disconnected before response was fully written");
      return null;
    }

    log.error("Response serialization failed", ex);
    Map<String, String> error = new HashMap<>();
    error.put("error", "INTERNAL_SERVER_ERROR");
    error.put("message", "An unexpected server error occurred.");
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
  }

  @ExceptionHandler(com.bookfair.system.service.UserService.UserHasReservationsException.class)
  public ResponseEntity<Map<String, Object>> handleUserHasReservations(
      com.bookfair.system.service.UserService.UserHasReservationsException ex) {
    Map<String, Object> body = new HashMap<>();
    body.put("error", "USER_HAS_RESERVATIONS");
    body.put("message", "The user cannot be deleted while they still have active reservations.");
    body.put("reservationCount", ex.getCount());
    return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<Map<String, String>> handleGeneralException(Exception ex) {
    log.error("Unhandled application exception", ex);
    Map<String, String> error = new HashMap<>();
    error.put("error", "INTERNAL_SERVER_ERROR");
    error.put("message", "An unexpected error occurred.");
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
  }
}
