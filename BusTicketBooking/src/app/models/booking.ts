export interface Booking {
  bookingId: number;
  totalAmount: number;
  status: string;
  bookingDate: string;
  journeyDate: string;

  bus: {
    busName: string;
    source: string;       
    destination: string;
  };

  bookingSeats: {
    seat: {
      seatNumber: number;
    };
  }[];
}
