import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { bookings, events } from '@/lib/data';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { CalendarDays, MapPin, Ticket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfilePage() {

    const userBookings = bookings.filter(b => b.userId === 'user-1');

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-10">
                <h1 className="font-headline text-4xl md:text-5xl font-bold">My Bookings</h1>
                <p className="text-muted-foreground mt-2">A history of your theatrical adventures.</p>
            </div>

            {userBookings.length > 0 ? (
                <div className="grid gap-8">
                    {userBookings.map(booking => {
                        const event = events.find(e => e.id === booking.eventId);
                        if (!event) return null;
                        
                        const placeholder = getPlaceholderImage(event.image);

                        return (
                            <Card key={booking.id} className="flex flex-col md:flex-row overflow-hidden transition-shadow hover:shadow-lg">
                                <div className="md:w-1/3 relative min-h-[200px] md:min-h-0">
                                    <Image 
                                        src={placeholder?.imageUrl || "https://picsum.photos/seed/1/400/600"}
                                        alt={event.title}
                                        data-ai-hint={placeholder?.imageHint}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <CardHeader>
                                        <CardTitle className="font-headline text-2xl">{event.title}</CardTitle>
                                        <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 pt-1">
                                            <div className="flex items-center gap-2">
                                                <CalendarDays className="h-4 w-4" />
                                                <span>{new Date(event.date).toLocaleDateString('en-US', {dateStyle: 'medium'})}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4" />
                                                <span>{event.venue}</span>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="font-semibold">Seats: <span className="font-mono text-primary">{booking.seats.join(', ')}</span></p>
                                        <p className="text-sm text-muted-foreground">Booking ID: <span className="font-mono">{booking.id}</span></p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button asChild variant="outline">
                                            <Link href={`/booking-confirmation/${booking.id}`}>
                                                <Ticket className="mr-2 h-4 w-4" />
                                                View E-Ticket
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            ) : (
                <div className="text-center py-20 border border-dashed rounded-lg">
                    <h2 className="text-2xl font-semibold">No Bookings Yet</h2>
                    <p className="text-muted-foreground mt-2">Your stage awaits! Book a ticket to start your collection.</p>
                    <Button asChild className="mt-6">
                        <Link href="/">Explore Events</Link>
                    </Button>
                </div>
            )}
        </div>
    )
}
