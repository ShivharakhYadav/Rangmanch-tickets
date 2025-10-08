import type { Event, HallLayout, Booking } from './types';

export const seatTiers = [
  { id: 'tier-platinum', name: 'Platinum', price: 2500, color: 'hsl(330, 80%, 60%)' },
  { id: 'tier-gold', name: 'Gold', price: 1500, color: 'hsl(45, 100%, 50%)' },
  { id: 'tier-silver', name: 'Silver', price: 800, color: 'hsl(210, 20%, 80%)' },
];

const generateSeats = (): HallLayout['seats'] => {
  const seats: HallLayout['seats'] = [];
  const rows = Array.from({ length: 15 }, (_, i) => String.fromCharCode(65 + i));
  const seatsPerRow = 20;

  rows.forEach((row, rowIndex) => {
    for (let i = 1; i <= seatsPerRow; i++) {
      let tierId = 'tier-silver';
      if (rowIndex < 4) tierId = 'tier-platinum';
      else if (rowIndex < 10) tierId = 'tier-gold';

      seats.push({
        id: `${row}${i}`,
        row: row,
        number: i,
        tierId: tierId,
        isBooked: Math.random() > 0.7,
      });
    }
  });

  return seats;
};


export const hallLayouts: HallLayout[] = [
    {
        id: 'main-auditorium',
        name: 'Main Auditorium',
        seats: generateSeats(),
        tiers: seatTiers
    }
]

export const events: Event[] = [
  {
    id: 'evt-1',
    title: 'Hamlet: A Modern Tragedy',
    category: 'Classic Play',
    date: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(),
    time: '7:30 PM',
    venue: 'Royal Grand Theatre',
    image: 'event-hamlet',
    hallLayoutId: 'main-auditorium'
  },
  {
    id: 'evt-2',
    title: 'Cats: The Musical',
    category: 'Musical',
    date: new Date(new Date().setDate(new Date().getDate() + 25)).toISOString(),
    time: '8:00 PM',
    venue: 'Broadway Stage',
    image: 'event-cats',
    hallLayoutId: 'main-auditorium'
  },
  {
    id: 'evt-3',
    title: 'The Grand Illusionist',
    category: 'Magic Show',
    date: new Date().toISOString(),
    time: '6:00 PM',
    venue: 'Mystique Arena',
    image: 'event-illusionist',
    hallLayoutId: 'main-auditorium'
  },
  {
    id: 'evt-4',
    title: 'An Evening with the Symphony',
    category: 'Classical Concert',
    date: new Date(new Date().setDate(new Date().getDate() - 15)).toISOString(),
    time: '7:00 PM',
    venue: 'Harmony Concert Hall',
    image: 'event-symphony',
    hallLayoutId: 'main-auditorium'
  },
  {
    id: 'evt-5',
    title: 'Laugh Riot: Comedy Night',
    category: 'Stand-up Comedy',
    date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
    time: '9:00 PM',
    venue: 'The Comedy Cellar',
    image: 'event-comedy',
    hallLayoutId: 'main-auditorium'
  },
  {
    id: 'evt-6',
    title: 'La Traviata: The Opera',
    category: 'Opera',
    date: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString(),
    time: '7:30 PM',
    venue: 'The Opera House',
    image: 'event-opera',
    hallLayoutId: 'main-auditorium'
  }
];

export const bookings: Booking[] = [
    {
        id: 'bkg-12345',
        eventId: 'evt-4',
        userId: 'user-1',
        seats: ['C5', 'C6'],
        totalAmount: 5000,
        bookingDate: new Date(new Date().setDate(new Date().getDate() - 15)).toISOString()
    },
    {
        id: 'bkg-67890',
        eventId: 'evt-6',
        userId: 'user-1',
        seats: ['F10', 'F11', 'F12'],
        totalAmount: 4500,
        bookingDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString()
    }
];
