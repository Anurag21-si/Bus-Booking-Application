import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from '../../services/bus';
import { BookingService } from '../../services/booking';

@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seat-selection.html',
  styleUrl: './seat-selection.css'
})
export class SeatSelectionComponent implements OnInit {

  busId!: number;
  totalSeats: number = 40;

  seats: number[] = [];
  selectedSeats: number[] = [];
  bookedSeats: number[] = [];

  seatPrices: { [key: number]: number } = {};
  bus: any;

  constructor(
    private route: ActivatedRoute,
    private busService: BusService,
    private bookService: BookingService,
    private router: Router
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      console.error('ID missing in route!');
      return;
    }

    this.busId = Number(idParam);
    this.seats = Array.from({ length: this.totalSeats }, (_, i) => i + 1);

    // ✅ Load bus details
    this.busService.getBusById(this.busId).subscribe({
      next: (data) => {
        this.bus = data;

        this.seats.forEach(seat => {
          this.seatPrices[seat] = this.bus.price;
        });
      },
      error: (err) => {
        console.error('Error fetching bus:', err);
      }
    });

    this.loadBookedSeats();
  }

  loadBookedSeats() {
    this.bookService.getBookedSeats(this.busId).subscribe({
      next: (data) => {
        this.bookedSeats = data;
      },
      error: (err) => {
        console.error('Error fetching booked seats:', err);
      }
    });
  }

  get selectedCount(): number {
    return this.selectedSeats.length;
  }

  get totalPrice(): number {
    return this.selectedSeats.reduce((sum, seat) => {
      return sum + (this.seatPrices[seat] || 0);
    }, 0);
  }

  toggleSeat(seat: number) {
    if (this.isBooked(seat)) return;

    if (this.selectedSeats.includes(seat)) {
      this.selectedSeats = this.selectedSeats.filter(s => s !== seat);
    } else {
      this.selectedSeats.push(seat);
    }
  }

  isSelected(seat: number): boolean {
    return this.selectedSeats.includes(seat);
  }

  isBooked(seat: number): boolean {
    return this.bookedSeats.includes(seat);
  }

  getSeatPrice(seat: number): number {
    return this.seatPrices[seat];
  }

  // 🔥 FINAL FIXED BOOKING METHOD
  bookNow() {

    // ✅ Validate seat selection
    if (this.selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    // ✅ Get logged-in user
    const userId = Number(localStorage.getItem('userId'));

    if (!userId) {
      alert('❌ Please login first');
      this.router.navigate(['/login']);
      return;
    }

    console.log("Booking Request:", {
      userId: userId,
      busId: this.busId,
      seats: this.selectedSeats
    });

    // ✅ Correct API call
    this.bookService
      .bookSeats(userId, this.busId, this.selectedSeats)
      .subscribe({
        next: (res) => {
          console.log("Booking success:", res);

          alert('✅ Booked successfully');

          // optional: clear selection
          this.selectedSeats = [];

          // ✅ redirect to booking history
          this.router.navigate(['/bookings']);
        },
        error: (err) => {
          console.error('Booking error:', err);
          alert(err.error?.message || '❌ Booking failed');
        }
      });
  }

  // UI grid layout
  getSeatGrid(): any[] {
    const grid = [];
    const seatsPerColumn = 4;
    const totalColumns = Math.ceil(this.seats.length / seatsPerColumn);

    for (let i = 0; i < seatsPerColumn; i++) {
      const left: number[] = [];
      const right: number[] = [];

      for (let j = 0; j < totalColumns; j++) {
        const index = j * seatsPerColumn + i;
        const seat = this.seats[index];

        if (seat) {
          if (j < totalColumns / 2) {
            left.push(seat);
          } else {
            right.push(seat);
          }
        }
      }

      grid.push({ left, right });
    }

    return grid;
  }
}
