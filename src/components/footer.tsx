import { Theater } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

const socialLinks = [
  { name: 'Twitter', href: '#' },
  { name: 'Facebook', href: '#' },
  { name: 'Instagram', href: '#' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Theater className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl font-bold">Rangmanch</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Rangmanch Tickets. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <Button key={link.name} variant="ghost" size="icon" asChild>
                <Link href={link.href}>
                  <span className="sr-only">{link.name}</span>
                  {/* In a real app, you would use icons for each social media */}
                  <div className="h-5 w-5 bg-muted-foreground/50 rounded-full" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
