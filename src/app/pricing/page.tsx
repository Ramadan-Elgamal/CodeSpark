import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { Check } from 'lucide-react';

const features = [
  { text: 'AI Course Generation', free: '5 per month', pro: 'Unlimited' },
  { text: 'Bite-Sized Lessons', free: true, pro: true },
  { text: 'Save & Manage Courses', free: true, pro: true },
  { text: 'Priority Support', free: false, pro: true },
  { text: 'Advanced AI Model', free: false, pro: true },
  { text: 'Export to PDF', free: false, pro: true },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Find the perfect plan
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Start for free and scale up as you grow. No hidden fees.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-md gap-8 lg:max-w-4xl lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Free</CardTitle>
                  <CardDescription>Perfect for getting started and exploring our features.</CardDescription>
                  <div className="flex items-baseline gap-2 pt-4">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {features.map((feature, index) => feature.free && (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-primary" />
                          <span>{feature.text} {typeof feature.free === 'string' && `(${feature.free})`}</span>
                        </li>
                      )
                    )}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="border-accent ring-2 ring-accent">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="font-headline">Pro</CardTitle>
                    <div className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">Most Popular</div>
                  </div>
                  <CardDescription>For professionals and teams who need more power and support.</CardDescription>
                  <div className="flex items-baseline gap-2 pt-4">
                    <span className="text-4xl font-bold">$10</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {features.map((feature, index) => feature.pro && (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-accent" />
                          <span>{feature.text} {typeof feature.pro === 'string' && `(${feature.pro})`}</span>
                        </li>
                      )
                    )}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/signup">Upgrade to Pro</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
