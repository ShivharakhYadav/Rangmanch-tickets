'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, Theater, Ticket, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Events' },
    { href: '/profile', label: 'My Bookings' },
  ];

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          'transition-colors hover:text-primary-foreground text-lg sm:text-sm',
          isActive ? 'text-primary-foreground font-semibold' : 'text-muted-foreground'
        )}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Theater className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-bold">Rangmanch</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-4">
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/login">
              <User className="mr-2 h-4 w-4" /> Login
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 text-lg font-medium h-full pt-8">
                 {navLinks.map((link) => (
                  <NavLink key={link.href} {...link} />
                ))}
                <Button asChild className="mt-auto">
                  <Link href="/login">
                    <User className="mr-2 h-4 w-4" /> Login
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
