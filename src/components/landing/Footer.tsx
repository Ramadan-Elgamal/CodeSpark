import Link from 'next/link';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter, Coffee } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <div className="col-span-full lg:col-span-2 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2 mb-4" prefetch={false}>
              <Logo className="h-7 w-7 text-primary" />
              <span className="text-xl font-headline font-semibold text-foreground">CodeSpark</span>
            </Link>
            <p className="text-sm max-w-xs">AI-powered course generation for the modern web.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Product</h4>
            <nav className="flex flex-col gap-1.5">
              <Link href="/#features" className="text-sm hover:underline underline-offset-4" prefetch={false}>
                Features
              </Link>
              <Link href="/pricing" className="text-sm hover:underline underline-offset-4" prefetch={false}>
                Pricing
              </Link>
              <Link href="/login" className="text-sm hover:underline underline-offset-4" prefetch={false}>
                Sign In
              </Link>
            </nav>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Company</h4>
            <nav className="flex flex-col gap-1.5">
              <Link href="#" className="text-sm hover:underline underline-offset-4" prefetch={false}>
                About Us
              </Link>
              <Link href="#" className="text-sm hover:underline underline-offset-4" prefetch={false}>
                Careers
              </Link>
              <Link href="#" className="text-sm hover:underline underline-offset-4" prefetch={false}>
                Contact
              </Link>
            </nav>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Legal</h4>
            <nav className="flex flex-col gap-1.5">
              <Link href="#" className="text-sm hover:underline underline-offset-4" prefetch={false}>
                Terms of Service
              </Link>
              <Link href="#" className="text-sm hover:underline underline-offset-4" prefetch={false}>
                Privacy Policy
              </Link>
            </nav>
          </div>
          <div className="space-y-3 rounded-lg bg-background/50 p-4">
            <h4 className="font-semibold text-foreground">Enjoying the app?</h4>
            <p className="text-xs">
              Consider supporting the project with a small donation. It helps keep the servers running!
            </p>
            <Button asChild size="sm" className="bg-[#FFDD00] text-black hover:bg-[#FFDD00]/90 w-full">
              <Link href="https://www.buymeacoffee.com/your-username" target="_blank" rel="noopener noreferrer">
                <Coffee className="mr-2" /> Buy Me a Coffee
              </Link>
            </Button>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">&copy; {currentYear} CodeSpark AI. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="#"><Twitter /></Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#"><Github /></Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#"><Linkedin /></Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
