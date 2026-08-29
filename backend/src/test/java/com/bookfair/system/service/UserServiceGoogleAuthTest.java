package com.bookfair.system.service;

import com.bookfair.system.dto.UserProfileResponse;
import com.bookfair.system.entity.User;
import com.bookfair.system.repository.GenreRepository;
import com.bookfair.system.repository.ReservationRepository;
import com.bookfair.system.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceGoogleAuthTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private GenreRepository genreRepository;

    @Mock
    private ReservationRepository reservationRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Test
    void completeGoogleProfile_createsUserWithAuth0SubAndBusinessDetails() {
        when(userRepository.findByAuth0Sub("google-sub-123")).thenReturn(Optional.empty());
        when(userRepository.findByEmailIgnoreCase("vendor@example.com")).thenReturn(Optional.empty());
        when(passwordEncoder.encode(any())).thenReturn("hashed-password");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        UserProfileResponse response = userService.completeGoogleProfile(
                "google-sub-123",
                "vendor@example.com",
                "Test Vendor",
                "0771234567",
                "Book Haven"
        );

        assertThat(response.getEmail()).isEqualTo("vendor@example.com");
        assertThat(response.getName()).isEqualTo("Test Vendor");
        assertThat(response.getContactNumber()).isEqualTo("0771234567");
        assertThat(response.getBusinessName()).isEqualTo("Book Haven");
        assertThat(response.getRole()).isEqualTo("VENDOR");
    }
}
