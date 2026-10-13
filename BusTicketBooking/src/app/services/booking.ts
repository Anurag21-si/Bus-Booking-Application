import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking';

@Injectable({ providedIn: 'root' })
export class BookingService {

  private baseUrl = 'http://localhost:8080/bookings';

  constructor(private http: HttpClient) {}

  // ✅ FIXED: matches component call
  bookSeats(userId: number, busId: number, seatIds: number[]) {
    return this.http.post(
      `${this.baseUrl}/book?userId=${userId}&busId=${busId}`,
      seatIds
    );
  }

  getBookedSeats(busId: number): Observable<number[]> {
    return this.http.get<number[]>(
      `${this.baseUrl}/booked-seats/${busId}`
    );
  }

  getUserBookings(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(
      `${this.baseUrl}/${userId}`
    );
  }
}
