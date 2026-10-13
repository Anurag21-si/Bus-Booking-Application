package com.busbooking.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.busbooking.entity.*;
import com.busbooking.repository.*;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private BookingSeatRepository bookingSeatRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private BusRepository busRepository;

    @Autowired
    private UserRepository userRepository;

    public Booking bookSeats(int userId, int busId, String journeyDate, List<Integer> seatNumbers) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Bus bus = busRepository.findById(busId)
                .orElseThrow(() -> new RuntimeException("Bus not found"));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setBus(bus);
        booking.setBookingDate(LocalDateTime.now());
        booking.setStatus("CONFIRMED");

        double totalAmount = seatNumbers.size() * bus.getPrice();
        booking.setTotalAmount(totalAmount);

        Booking savedBooking = bookingRepository.save(booking);

        for (Integer seatNumber : seatNumbers) {

            // ✅ FETCH SEAT CORRECTLY
            Seats seat = seatRepository
                    .findByBus_BusIdAndSeatNumber(busId, String.valueOf(seatNumber))
                    .orElseThrow(() -> new RuntimeException("Seat " + seatNumber + " not found"));

            // ✅ PREVENT DUPLICATE ONLY FOR SAME BUS
            boolean alreadyBooked = bookingSeatRepository.existsBySeat_SeatId(seat.getSeatId());
            if (alreadyBooked) {
                throw new RuntimeException("Seat " + seatNumber + " already booked");
            }

            BookingSeat bookingSeat = new BookingSeat();
            bookingSeat.setBooking(savedBooking);
            bookingSeat.setSeat(seat);

            bookingSeatRepository.save(bookingSeat);
        }

        return savedBooking;
    }
    
    public List<Integer> getBookedSeatNumbers(int busId) {
		return bookingSeatRepository.findBookedSeatNumbersByBusId(busId);
	}
    
    public List<Booking> getBookingsByUser(int userId) {
        return bookingRepository.findByUser_UserId(userId);
    }

}