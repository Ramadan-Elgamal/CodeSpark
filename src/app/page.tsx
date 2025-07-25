import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, BrainCircuit, Rocket } from 'lucide-react';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Generate Bite-Sized Programming Courses with AI
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    CodeSpark AI helps you create engaging, focused course content in minutes, not months. Perfect for educators, developers, and lifelong learners.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/signup">
                      Get Started for Free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                width="600"
                height="400"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                data-ai-hint="abstract code"
              />
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Learn Smarter, Not Harder</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is packed with features designed to accelerate your learning and content creation process.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                    <BrainCircuit className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline text-xl">AI-Powered Generation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Instantly generate course titles, summaries, and lesson plans on any programming topic.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline text-xl">Bite-Sized Lessons</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Courses are broken down into small, manageable lessons for focused learning.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                    <Rocket className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline text-xl">Save & Manage</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Keep track of your generated courses and build your own learning library.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Spark Your Coding Journey?</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our plans and find the perfect fit for your needs.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
               <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">
                <Link href="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
