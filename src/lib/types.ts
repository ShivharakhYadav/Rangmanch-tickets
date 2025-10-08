export interface SeatTier {
  id: string;
  name: string;
  price: number;
  color: string;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  tierId: string;
  isBooked: boolean;
}

export interface HallLayout {
  id: string;
  name: string;
  seats: Seat[];
  tiers: SeatTier[];
}

export interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  image: string;
  hallLayoutId: string;
}

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  seats: string[]; // array of seat IDs
  totalAmount: number;
  bookingDate: string;
}
