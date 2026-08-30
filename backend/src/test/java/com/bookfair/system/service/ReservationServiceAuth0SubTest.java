package com.bookfair.system.service;

import com.bookfair.system.dto.request.ReservationRequest;
import com.bookfair.system.entity.Reservation;
import com.bookfair.system.entity.Stall;
import com.bookfair.system.entity.User;
import com.bookfair.system.repository.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ReservationServiceAuth0SubTest {

    @Mock
    private ReservationRepository reservationRepository;

    @Mock
    private ReservationStallRepository reservationStallRepository;

    @Mock
    private StallRepository stallRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PaymentRepository paymentRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private ReservationService reservationService;

    @Test
    void createReservation_setsAuth0SubFromJwtSubject() {
        User user = new User();
        user.setId(10L);
        user.setEmail("vendor@example.com");
        user.setName("Vendor A");
        user.setAuth0Sub("auth0|vendor-a");

        Stall stall = new Stall();
        stall.setId(99L);
        stall.setStallCode("A1");
        stall.setReserved(false);
        stall.setFloor(new com.bookfair.system.entity.Floor());
        stall.getFloor().setFloorName("Ground");
        com.bookfair.system.entity.StallType stallType = new com.bookfair.system.entity.StallType();
        stallType.setSize("SMALL");
        stallType.setPrice(150.0);
        stall.setStallType(stallType);

        ReservationRequest request = new ReservationRequest();
        request.setStallIds(List.of(99L));
        request.setPaymentMethod("CARD");

        when(userRepository.findByAuth0Sub("auth0|vendor-a")).thenReturn(Optional.of(user));
        when(userRepository.findById(10L)).thenReturn(Optional.of(user));
        when(reservationStallRepository.countStallsByUserId(10L)).thenReturn(0L);
        when(stallRepository.findAllById(List.of(99L))).thenReturn(List.of(stall));
        when(reservationRepository.save(any(Reservation.class))).thenAnswer(invocation -> invocation.getArgument(0));

        reservationService.createReservation("auth0|vendor-a", request);

        ArgumentCaptor<Reservation> reservationCaptor = ArgumentCaptor.forClass(Reservation.class);
        org.mockito.Mockito.verify(reservationRepository).save(reservationCaptor.capture());
        assertThat(reservationCaptor.getValue().getAuth0Sub()).isEqualTo("auth0|vendor-a");
    }
}
