import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  CheckCircle,
  Download,
  CalendarDays,
  MapPin,
  Clock,
} from 'lucide-react';
import Link from 'next/link';

export default function BookingConfirmationPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className='container mx-auto px-4 py-12'>
      <div className='max-w-2xl mx-auto'>
        <div className='text-center mb-8'>
          <CheckCircle className='h-16 w-16 text-green-500 mx-auto mb-4' />
          <h1 className='font-headline text-4xl md:text-5xl font-bold'>
            Booking Confirmed!
          </h1>
          <p className='text-muted-foreground mt-2'>
            Your e-ticket has been sent to your email and WhatsApp.
          </p>
        </div>

        <Card className='overflow-hidden'>
          <CardHeader className='bg-muted/30 p-6'>
            <CardTitle className='text-2xl font-headline'>
              Hamlet: A Modern Tragedy
            </CardTitle>
            <CardDescription>Your E-Ticket</CardDescription>
          </CardHeader>
          <CardContent className='p-6 grid md:grid-cols-3 gap-6'>
            <div className='md:col-span-2 space-y-4'>
              <div className='flex items-center gap-3'>
                <CalendarDays className='h-5 w-5 text-accent' />
                <div>
                  <p className='font-semibold'>Saturday, July 27, 2024</p>
                  <p className='text-sm text-muted-foreground'>Date</p>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <Clock className='h-5 w-5 text-accent' />
                <div>
                  <p className='font-semibold'>7:30 PM</p>
                  <p className='text-sm text-muted-foreground'>Time</p>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <MapPin className='h-5 w-5 text-accent' />
                <div>
                  <p className='font-semibold'>Royal Grand Theatre</p>
                  <p className='text-sm text-muted-foreground'>Venue</p>
                </div>
              </div>
              <Separator />
              <div>
                <p className='font-semibold'>Seats: A5, A6</p>
                <p className='text-sm text-muted-foreground'>Platinum Tier</p>
              </div>
            </div>
            <div className='flex flex-col items-center justify-center gap-2 border-l border-dashed pl-6'>
              <div className='bg-white p-2 rounded-lg'>
                <svg
                  width='100'
                  height='100'
                  viewBox='0 0 100 100'
                >
                  <rect
                    width='100'
                    height='100'
                    fill='#f0f0f0'
                  />
                  <rect
                    x='20'
                    y='20'
                    width='20'
                    height='20'
                    fill='#000'
                  />
                  <rect
                    x='60'
                    y='20'
                    width='20'
                    height='20'
                    fill='#000'
                  />
                  <rect
                    x='20'
                    y='60'
                    width='20'
                    height='20'
                    fill='#000'
                  />
                  <rect
                    x='40'
                    y='40'
                    width='20'
                    height='20'
                    fill='#000'
                  />
                  <rect
                    x='80'
                    y='80'
                    width='20'
                    height='20'
                    fill='#000'
                  />
                  <rect
                    x='0'
                    y='0'
                    width='10'
                    height='10'
                    fill='#000'
                  />
                  <rect
                    x='90'
                    y='0'
                    width='10'
                    height='10'
                    fill='#000'
                  />
                  <rect
                    x='0'
                    y='90'
                    width='10'
                    height='10'
                    fill='#000'
                  />
                </svg>
              </div>
              <p className='text-xs text-muted-foreground mt-2 text-center'>
                Scan at entry
              </p>
            </div>
          </CardContent>
          <CardFooter className='bg-muted/30 p-4 flex justify-between items-center'>
            <div>
              <p className='text-xs text-muted-foreground'>Booking ID</p>
              <p className='font-mono text-sm'>{params.id}</p>
            </div>
            <Button variant='outline'>
              <Download className='mr-2 h-4 w-4' />
              Download PDF
            </Button>
          </CardFooter>
        </Card>

        <div className='text-center mt-8'>
          <Button asChild>
            <Link href='/'>Back to Events</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
