package com.busbooking.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "bookings")
public class Booking {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private int bookingId;

    @Column(name = "total_amount")
    private double totalAmount;

    private String status;

    @Column(name = "booking_date")
    private LocalDateTime bookingDate;

    // ✅ NEW FIELD (IMPORTANT)
    @Column(name = "journey_date")
    private String journeyDate;

    // ✅ Prevent recursion
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"bookings"})
    private User user;

    // ✅ Prevent recursion
    @ManyToOne
    @JoinColumn(name = "bus_id")
    @JsonIgnoreProperties({"bookings"})
    private Bus bus;

    // ✅ Booking Seats
    @OneToMany(mappedBy = "booking", fetch = FetchType.EAGER)
    private List<BookingSeat> bookingSeats;

    public Booking() {}

    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }

    // 🔥 NEW GETTER/SETTER
    public String getJourneyDate() {
        return journeyDate;
    }

    public void setJourneyDate(String journeyDate) {
        this.journeyDate = journeyDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Bus getBus() {
        return bus;
    }

    public void setBus(Bus bus) {
        this.bus = bus;
    }

    public List<BookingSeat> getBookingSeats() {
        return bookingSeats;
    }

    public void setBookingSeats(List<BookingSeat> bookingSeats) {
        this.bookingSeats = bookingSeats;
    }
}