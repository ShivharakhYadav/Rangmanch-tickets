'use client';

import { useState, useEffect, useMemo } from 'react';
import { HallLayout, Seat as SeatType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { Ticket, Clock } from 'lucide-react';

interface SeatSelectionProps {
  layout: HallLayout;
}

const Seat = ({
  seat,
  tierColor,
  isSelected,
  onSelect,
}: {
  seat: SeatType;
  tierColor: string;
  isSelected: boolean;
  onSelect: (seat: SeatType) => void;
}) => {
  const isBooked = seat.isBooked;
  const status = isBooked ? 'booked' : isSelected ? 'selected' : 'available';

  const handleClick = () => {
    if (!isBooked) {
      onSelect(seat);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isBooked}
      className={cn(
        'w-6 h-6 rounded-t-md text-xs font-bold flex items-center justify-center transition-all duration-200 transform hover:scale-110',
        status === 'available' && 'bg-muted-foreground/30 hover:bg-primary/80',
        status === 'selected' && 'bg-primary text-primary-foreground scale-110',
        status === 'booked' && 'bg-destructive/50 cursor-not-allowed',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background'
      )}
      style={status === 'available' ? { borderBottom: `2px solid ${tierColor}` } : {}}
      aria-label={`Seat ${seat.id}, ${status}`}
    >
      {isSelected ? <Ticket className="w-4 h-4" /> : seat.number}
    </button>
  );
};

export default function SeatSelection({ layout }: SeatSelectionProps) {
  const [selectedSeats, setSelectedSeats] = useState<SeatType[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const router = useRouter();

  useEffect(() => {
    if (selectedSeats.length > 0) {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setSelectedSeats([]);
        toast({
          title: "Time's up!",
          description: "Your selected seats have been released.",
          variant: "destructive",
        });
      }
    } else {
      setTimeLeft(60);
    }
  }, [timeLeft, selectedSeats.length]);

  const handleSelectSeat = (seat: SeatType) => {
    setSelectedSeats((prev) => {
      const isAlreadySelected = prev.find((s) => s.id === seat.id);
      if (isAlreadySelected) {
        return prev.filter((s) => s.id !== seat.id);
      } else {
        if (prev.length >= 10) {
          toast({
            title: 'Selection Limit Reached',
            description: 'You can select a maximum of 10 seats.',
          });
          return prev;
        }
        return [...prev, seat];
      }
    });
  };

  const rows = useMemo(() => {
    const seatMap: Record<string, SeatType[]> = {};
    layout.seats.forEach((seat) => {
      if (!seatMap[seat.row]) {
        seatMap[seat.row] = [];
      }
      seatMap[seat.row].push(seat);
    });
    return Object.entries(seatMap).sort((a, b) => a[0].localeCompare(b[0]));
  }, [layout.seats]);

  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((total, seat) => {
      const tier = layout.tiers.find((t) => t.id === seat.tierId);
      return total + (tier?.price || 0);
    }, 0);
  }, [selectedSeats, layout.tiers]);

  const handleCheckout = () => {
    if (selectedSeats.length === 0) {
      toast({ title: 'No seats selected', description: 'Please select at least one seat.' });
      return;
    }
    // In a real app, you'd pass the selection details to the checkout page
    router.push('/checkout');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full">
      <div className="flex-grow">
        <div className="w-full bg-card p-4 rounded-lg shadow-md overflow-x-auto">
          <div className="flex flex-col items-center">
            <div className="w-full text-center py-2 mb-4 bg-muted rounded">
              <p className="font-bold tracking-widest text-muted-foreground">STAGE</p>
            </div>
            <div className="flex flex-col gap-2">
              {rows.map(([rowLabel, seatsInRow]) => (
                <div key={rowLabel} className="flex items-center gap-4">
                  <div className="w-6 text-center font-bold text-muted-foreground">{rowLabel}</div>
                  <div className="flex gap-1.5">
                    {seatsInRow.map((seat, index) => (
                      <Seat
                        key={seat.id}
                        seat={seat}
                        tierColor={layout.tiers.find(t => t.id === seat.tierId)?.color || ''}
                        isSelected={!!selectedSeats.find((s) => s.id === seat.id)}
                        onSelect={handleSelectSeat}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-6 text-sm">
          {layout.tiers.map((tier) => (
            <div key={tier.id} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: tier.color }}></div>
              <span>{tier.name} - ₹{tier.price.toLocaleString()}</span>
            </div>
          ))}
           <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm bg-destructive/50"></div>
              <span>Booked</span>
            </div>
        </div>
      </div>
      <aside className="w-full lg:w-80 xl:w-96">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Your Selection</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {selectedSeats.length > 0 ? (
              <>
                <div className="flex items-center justify-between p-3 bg-muted rounded-md text-lg">
                  <div className="flex items-center gap-2 font-bold text-primary">
                    <Clock className="w-5 h-5" />
                    <span>{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Seats held for</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map(s => <span key={s.id} className="bg-primary/20 text-primary-foreground py-1 px-2 rounded-md font-mono">{s.id}</span>)}
                </div>
              </>
            ) : (
              <p className="text-muted-foreground text-center py-8">Select seats from the map.</p>
            )}
          </CardContent>
          <CardFooter className="flex-col gap-4 items-stretch">
            <div className="flex justify-between items-baseline text-2xl font-bold">
              <span className="text-base font-normal text-muted-foreground">Total Price</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
            <Button size="lg" onClick={handleCheckout} disabled={selectedSeats.length === 0}>
              Proceed to Checkout
            </Button>
          </CardFooter>
        </Card>
      </aside>
    </div>
  );
}
