import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-background/95 backdrop-blur-sm sticky top-0 z-50 border-b">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <Logo className="h-6 w-6 text-primary" />
        <span className="font-headline ml-2 text-lg font-semibold">CodeSpark AI</span>
      </Link>
      <nav className="ml-auto hidden gap-4 sm:gap-6 lg:flex items-center">
        <Link href="/#features" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Features
        </Link>
        <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Pricing
        </Link>
        <ThemeToggle />
        <Button asChild variant="ghost">
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/signup">Sign Up</Link>
        </Button>
      </nav>
      <div className="ml-auto lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-6 text-lg font-medium mt-8">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
                <Logo className="h-6 w-6 text-primary" />
                <span className="font-headline">CodeSpark AI</span>
              </Link>
              <Link href="/#features" className="hover:text-foreground" prefetch={false}>
                Features
              </Link>
              <Link href="/pricing" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                Pricing
              </Link>
              <div className="flex justify-center">
                <ThemeToggle />
              </div>
              <Link href="/login" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                Login
              </Link>
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground w-full mt-4">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
