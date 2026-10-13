import { Component, OnInit } from '@angular/core';
import { Booking } from '../../models/booking';
import { BookingService } from '../../services/booking';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-history.html',
  styleUrls: ['./booking-history.css'],
})
export class BookingHistoryComponent implements OnInit {

  bookings$: Observable<Booking[]> | null = null;  // use Observable + async
  userId!: number;

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit() {
    const userIdStr = localStorage.getItem('userId');

    if (!userIdStr || isNaN(Number(userIdStr))) {
      alert('❌ Please login first');
      this.router.navigate(['/login']);
      return;
    }

    this.userId = Number(userIdStr);

    this.bookings$ = this.bookingService.getUserBookings(this.userId);
  }

  getSeatNumbers(booking: any): string {
    return booking.bookingSeats
      ?.map((bs: any) => bs.seat?.seatNumber)
      .join(', ') || 'No seats';
  }
}
