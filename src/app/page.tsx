import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, BookOpen, BrainCircuit, Rocket, Edit, Share2, Languages, Star, CheckCircle, Lightbulb, UserCheck, HelpCircle } from 'lucide-react';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-24 lg:py-32 xl:py-40 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-4">
                  <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Create complete programming courses in minutes with AI.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Save hours of planning with instant, editable course outlines designed for developers, educators, and lifelong learners.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/signup">
                      Generate Your First Course
                      <ArrowRight className="ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x500.png"
                width="600"
                height="500"
                alt="AI generating a course structure"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
                data-ai-hint="abstract code"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-muted-foreground font-semibold">Key Features</div>
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Learn and Create Smarter, Not Harder</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Our platform is packed with features to accelerate your content creation process.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none">
              <div className="grid gap-1 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-2">
                    <BrainCircuit />
                  </div>
                <h3 className="text-lg font-bold font-headline">AI-Powered Generation</h3>
                <p className="text-sm text-muted-foreground">Instantly generate course titles, summaries, and lesson plans.</p>
              </div>
              <div className="grid gap-1 text-center">
                 <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-2">
                    <Edit />
                  </div>
                <h3 className="text-lg font-bold font-headline">Editable Lessons</h3>
                <p className="text-sm text-muted-foreground">Customize every part of your course to match your vision.</p>
              </div>
              <div className="grid gap-1 text-center">
                 <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-2">
                    <Share2 />
                  </div>
                <h3 className="text-lg font-bold font-headline">Shareable Pages</h3>
                <p className="text-sm text-muted-foreground">Share your creations with a unique, read-only link.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-muted-foreground font-semibold">How It Works</div>
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Generate a Course in 3 Simple Steps</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                        Go from idea to a full course outline in just a few clicks.
                    </p>
                </div>
                <div className="relative mx-auto grid max-w-5xl items-start gap-12 sm:grid-cols-3">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-border -translate-y-4 hidden sm:block" />
                     <div className="relative flex flex-col items-center text-center gap-2">
                         <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg border-4 border-background z-10">1</div>
                        <h3 className="font-bold font-headline mt-2">Enter Your Topic</h3>
                        <p className="text-sm text-muted-foreground">Tell the AI what you want to teach, from "React" to "Data Structures."</p>
                    </div>
                    <div className="relative flex flex-col items-center text-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg border-4 border-background z-10">2</div>
                        <h3 className="font-bold font-headline mt-2">Choose the Level</h3>
                        <p className="text-sm text-muted-foreground">Select whether the course is for beginners, intermediate, or advanced learners.</p>
                    </div>
                    <div className="relative flex flex-col items-center text-center gap-2">
                         <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg border-4 border-background z-10">3</div>
                        <h3 className="font-bold font-headline mt-2">Generate & Customize</h3>
                        <p className="text-sm text-muted-foreground">Let the AI build your course, then edit and save it to your dashboard.</p>
                    </div>
                </div>
            </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
             <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-muted-foreground font-semibold">Testimonials</div>
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Loved by Developers and Educators</h2>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Star className="text-yellow-400 fill-yellow-400" />
                            <Star className="text-yellow-400 fill-yellow-400" />
                            <Star className="text-yellow-400 fill-yellow-400" />
                            <Star className="text-yellow-400 fill-yellow-400" />
                            <Star className="text-yellow-400 fill-yellow-400" />
                        </div>
                        <p className="text-foreground mb-4">"I created a full Python course in 5 minutes! This is a game-changer for tutoring and quickly creating learning material."</p>
                        <div className="flex items-center gap-3">
                            <Image src="https://placehold.co/40x40.png" width={40} height={40} alt="User" className="rounded-full" />
                            <div>
                                <p className="font-semibold">Alex D.</p>
                                <p className="text-sm text-muted-foreground">Programming Tutor</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Star className="text-yellow-400 fill-yellow-400" />
                            <Star className="text-yellow-400 fill-yellow-400" />
                            <Star className="text-yellow-400 fill-yellow-400" />
                            <Star className="text-yellow-400 fill-yellow-400" />
                            <Star className="text-yellow-400 fill-yellow-400" />
                        </div>
                        <p className="text-foreground mb-4">"As a developer, I use this to get up to speed on new frameworks. It's faster than sifting through documentation."</p>
                        <div className="flex items-center gap-3">
                            <Image src="https://placehold.co/40x40.png" width={40} height={40} alt="User" className="rounded-full" data-ai-hint="woman developer" />
                            <div>
                                <p className="font-semibold">Jenna K.</p>
                                <p className="text-sm text-muted-foreground">Software Engineer</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight">Find a Plan That Works For You</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Start for free and scale up as you grow. No hidden fees.
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

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
            <div className="container max-w-4xl mx-auto px-4 md:px-6">
                 <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-muted-foreground font-semibold">FAQ</div>
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How accurate is the AI?</AccordionTrigger>
                        <AccordionContent>
                        The AI is trained on a vast amount of programming knowledge and documentation. While it's highly accurate for most topics, we always recommend reviewing and editing the generated content to ensure it perfectly matches your requirements. It's a powerful assistant, not a replacement for expertise.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Can I edit the generated lessons?</AccordionTrigger>
                        <AccordionContent>
                        Absolutely! Every part of the course—titles, descriptions, lessons, and resources—is fully editable after generation. You have complete control to refine and tailor the content to your needs.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Do I own the content I create?</AccordionTrigger>
                        <AccordionContent>
                        Yes. You own the rights to the course content you generate and edit. You are free to use it for personal, educational, or commercial purposes.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>Which topics are supported?</AccordionTrigger>
                        <AccordionContent>
                        The AI supports a wide range of programming languages, frameworks, and concepts, from web development (React, Vue, Node.js) to data science (Python, Pandas) and mobile development. If there's a well-documented technology, chances are the AI can create a course on it.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
        
        {/* Final CTA */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight">Start Building Courses Now</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Turn your ideas into structured learning paths. Get started for free today.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
               <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                <Link href="/signup">
                  Sign Up For Free
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
