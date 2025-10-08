'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Ticket } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const router = useRouter();

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate payment processing
        const bookingId = `rng-${Date.now()}`;
        router.push(`/booking-confirmation/${bookingId}`);
    };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-headline text-4xl md:text-5xl font-bold text-center mb-8">
        Complete Your Booking
      </h1>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Order Summary */}
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Review your ticket selection before payment.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-start justify-between">
                <div>
                    <p className="font-semibold">Hamlet: A Modern Tragedy</p>
                    <p className="text-sm text-muted-foreground">Royal Grand Theatre</p>
                </div>
                <p className="text-sm">2 Tickets</p>
            </div>
            <Separator />
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span className='text-muted-foreground'>Platinum Seat (A5)</span>
                    <span>₹2,500</span>
                </div>
                <div className="flex justify-between">
                    <span className='text-muted-foreground'>Platinum Seat (A6)</span>
                    <span>₹2,500</span>
                </div>
            </div>
            <Separator />
             <div className="flex justify-between">
                <span className='text-muted-foreground'>Subtotal</span>
                <span>₹5,000</span>
            </div>
             <div className="flex justify-between">
                <span className='text-muted-foreground'>Taxes & Fees</span>
                <span>₹450</span>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 p-4 rounded-b-lg">
            <div className="flex justify-between w-full text-lg font-bold">
                <span>Total Amount</span>
                <span>₹5,450</span>
            </div>
          </CardFooter>
        </Card>

        {/* Payment Form */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>Enter your payment information below.</CardDescription>
          </CardHeader>
          <form onSubmit={handlePayment}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name on Card</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="card-number">Card Number</Label>
                <div className='relative'>
                    <Input id="card-number" placeholder="**** **** **** 1234" />
                    <CreditCard className='absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2 col-span-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit">
                <Ticket className="mr-2 h-4 w-4" />
                Pay & Confirm Booking
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
