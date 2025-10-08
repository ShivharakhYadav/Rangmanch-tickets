import SeatSelection from '@/components/seat-selection';
import { events, hallLayouts } from '@/lib/data';
import { notFound } from 'next/navigation';
import { CalendarDays, MapPin } from 'lucide-react';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/placeholder-images';

export default function EventPage({ params }: { params: { id: string } }) {
  const event = events.find((e) => e.id === params.id);
  
  if (!event) {
    notFound();
  }

  const layout = hallLayouts.find(l => l.id === event.hallLayoutId);

  if (!layout) {
    // Or render an error message
    notFound();
  }

  const placeholder = getPlaceholderImage(event.image);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative w-full h-48 md:h-64 lg:h-80 rounded-lg overflow-hidden mb-8">
        <Image
          src={placeholder?.imageUrl || "https://picsum.photos/seed/1/1200/400"}
          alt={event.title}
          data-ai-hint={placeholder?.imageHint}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary-foreground">{event.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-accent" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { dateStyle: 'full' })} at {event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-accent" />
                    <span>{event.venue}</span>
                </div>
            </div>
        </div>
      </div>
      
      <SeatSelection layout={layout} />
    </div>
  );
}

// This function can be used to pre-render static pages at build time.
export async function generateStaticParams() {
  return events.map((event) => ({
    id: event.id,
  }));
}
