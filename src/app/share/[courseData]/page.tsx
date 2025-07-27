
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, AlertTriangle, BookText, Rocket, FileText, Link as LinkIcon } from 'lucide-react';
import type { GenerateCourseOutput } from '@/ai/flows/generate-course';
import { Logo } from '@/components/icons';

export default function SharedCoursePage() {
  const params = useParams();
  const { courseData: encodedCourseData } = params;
  const [course, setCourse] = useState<GenerateCourseOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof encodedCourseData !== 'string') {
      setError('Invalid share link.');
      setIsLoading(false);
      return;
    }

    try {
      const decodedString = decodeURIComponent(atob(encodedCourseData));
      const courseJson = JSON.parse(decodedString);
      setCourse(courseJson);
    } catch (e) {
      console.error("Failed to parse shared course data", e);
      setError('The shared course link is corrupted or invalid.');
    } finally {
      setIsLoading(false);
    }
  }, [encodedCourseData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="px-4 lg:px-6 h-14 flex items-center border-b">
             <Skeleton className="h-8 w-32" />
        </header>
        <main className="flex-1 p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <Skeleton className="h-10 w-48" />
                <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-full mt-2" />
                </CardHeader>
                <CardContent className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                    ))}
                </CardContent>
                </Card>
            </div>
        </main>
      </div>
    );
  }

  if (error || !course) {
    return (
       <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-4">
            <Card className="w-full max-w-lg p-8 border-dashed">
                <AlertTriangle className="h-12 w-12 text-destructive mx-auto" />
                <h3 className="mt-4 text-xl font-semibold font-headline">Could Not Load Course</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    {error || 'The course you are looking for could not be displayed.'}
                </p>
                <Button asChild className="mt-6" variant="outline">
                    <Link href="/">
                        <ArrowLeft className="mr-2" /> Back to Homepage
                    </Link>
                </Button>
            </Card>
      </div>
    );
  }

  const curriculumTitle = course.isProjectBased ? 'Projects' : 'Curriculum';

  return (
    <div className="min-h-screen bg-secondary">
        <header className="px-4 lg:px-6 h-14 flex items-center bg-background border-b sticky top-0 z-10">
            <Link href="/" className="flex items-center justify-center" prefetch={false}>
                <Logo className="h-6 w-6 text-primary" />
                <span className="font-headline ml-2 text-lg font-semibold">CodeSpark AI</span>
            </Link>
             <Button asChild className="ml-auto">
                <Link href="/signup">
                    Create Your Own Course
                </Link>
            </Button>
        </header>
        <main className="p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <Card>
                    <CardHeader>
                    <CardTitle className="font-headline text-3xl">{course.title}</CardTitle>
                    <CardDescription className="text-base">{course.summary}</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <h4 className="font-semibold mb-4 text-xl font-headline">{curriculumTitle}</h4>
                        <Accordion type="multiple" className="w-full space-y-4">
                        {course.lessons.map((lesson, lessonIndex) => (
                        <AccordionItem key={lessonIndex} value={`lesson-${lessonIndex}`} className="border rounded-lg px-4 bg-background">
                            <AccordionTrigger className="text-lg font-semibold hover:no-underline gap-3">
                            <div className="flex items-center gap-3 flex-1">
                                {course.isProjectBased ? <Rocket className="size-5 text-primary"/> : <FileText className="size-5 text-primary"/>}
                                {`${lessonIndex + 1}. ${lesson.title}`}
                            </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pb-4">
                            <div className="space-y-4 pl-8 border-l-2 border-primary/20">
                                {Array.isArray(lesson.microLessons) && lesson.microLessons.length > 0 ? lesson.microLessons.map((microLesson, microIndex) => (
                                    <div key={microIndex} className="grid gap-1.5 leading-snug flex-1">
                                        <p className="font-semibold">{`${lessonIndex + 1}.${microIndex + 1} ${microLesson.title}`}</p>
                                        <p className="text-muted-foreground whitespace-pre-wrap text-base leading-relaxed">{microLesson.description}</p>
                                        
                                        {microLesson.resources && (microLesson.resources.free?.length || microLesson.resources.paid?.length) && (
                                            <div className="mt-3 rounded-md border bg-secondary/50 p-3 text-sm">
                                                <h6 className="font-semibold mb-2">Resources</h6>
                                                {microLesson.resources.free && microLesson.resources.free.length > 0 && (
                                                    <div className="mb-2">
                                                        <p className="font-medium text-secondary-foreground mb-1">Free</p>
                                                        <ul className="list-none space-y-1">
                                                            {microLesson.resources.free.map((link, linkIndex) => (
                                                                <li key={linkIndex}>
                                                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary hover:underline">
                                                                        <LinkIcon className="size-3" /> {link.title} <span className="text-xs text-muted-foreground">({link.platform})</span>
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                                {microLesson.resources.paid && microLesson.resources.paid.length > 0 && (
                                                    <div>
                                                        <p className="font-medium text-secondary-foreground mb-1">Paid</p>
                                                        <ul className="list-none space-y-1">
                                                            {microLesson.resources.paid.map((link, linkIndex) => (
                                                                <li key={linkIndex}>
                                                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary hover:underline">
                                                                    <LinkIcon className="size-3" /> {link.title} <span className="text-xs text-muted-foreground">({link.platform})</span>
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )) : (
                                    <p className="text-muted-foreground whitespace-pre-wrap text-base leading-relaxed">{lesson.description}</p>
                                )}
                            </div>
                            </AccordionContent>
                        </AccordionItem>
                        ))}
                    </Accordion>

                    <div className="mt-8 border-t pt-6">
                        <h4 className="font-headline text-xl flex items-center gap-2"><BookText className="size-5 text-primary" />Final Note</h4>
                        <p className="text-muted-foreground mt-2 text-base leading-relaxed">{course.finalNote}</p>
                    </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    </div>
  );
}
