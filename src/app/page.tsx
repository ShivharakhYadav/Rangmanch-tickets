import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin, Ticket } from 'lucide-react';
import { events } from '@/lib/data';
import { getPlaceholderImage } from '@/lib/placeholder-images';

export default function Home() {
  const now = new Date();
  const upcomingEvents = events.filter((e) => new Date(e.date) > now);
  const nowShowingEvents = events.filter((e) => new Date(e.date).toDateString() === now.toDateString());
  const pastEvents = events.filter((e) => new Date(e.date) < now && new Date(e.date).toDateString() !== now.toDateString());

  const EventCard = ({ event }: { event: (typeof events)[0] }) => {
    const placeholder = getPlaceholderImage(event.image);
    return (
      <Card className="flex flex-col overflow-hidden hover:shadow-accent/20 hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="p-0">
          <div className="relative h-60 w-full">
            <Image
              src={placeholder?.imageUrl || "https://picsum.photos/seed/1/400/600"}
              alt={placeholder?.description || "Event poster"}
              data-ai-hint={placeholder?.imageHint}
              fill
              className="object-cover"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <h3 className="font-headline text-2xl font-bold text-primary-foreground">{event.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{event.category}</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-accent" />
              <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" />
              <span>{event.venue}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button asChild className="w-full">
            <Link href={`/events/${event.id}`}>
              <Ticket className="mr-2 h-4 w-4" />
              Book Now
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  };
  
  const EventGrid = ({ eventsToShow }: { eventsToShow: typeof events }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {eventsToShow.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tight">Experience the Magic of Theatre</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Discover captivating plays, musicals, and performances. Your next unforgettable experience is just a ticket away.</p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto mb-8">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="now-showing">Now Showing</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <EventGrid eventsToShow={upcomingEvents} />
        </TabsContent>
        <TabsContent value="now-showing">
           {nowShowingEvents.length > 0 ? <EventGrid eventsToShow={nowShowingEvents} /> : <p className="text-center text-muted-foreground py-10">No events showing today. Check out what's upcoming!</p>}
        </TabsContent>
        <TabsContent value="past">
          <EventGrid eventsToShow={pastEvents} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
