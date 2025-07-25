
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { BookText, Rocket, ArrowLeft, AlertTriangle } from 'lucide-react';
import type { GenerateCourseOutput } from '@/ai/flows/generate-course';

export default function CourseDetailPage() {
  const params = useParams();
  const { courseId } = params;
  const [course, setCourse] = useState<GenerateCourseOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof courseId !== 'string') return;

    try {
      const item = window.localStorage.getItem('savedCourses');
      if (item) {
        const savedCourses = JSON.parse(item);
        const courseIndex = parseInt(courseId, 10);
        if (savedCourses[courseIndex]) {
          setCourse(savedCourses[courseIndex]);
        } else {
          setError('Course not found.');
        }
      } else {
        setError('No saved courses found.');
      }
    } catch (e) {
      console.error("Failed to parse saved courses from localStorage", e);
      setError('Failed to load course data.');
    } finally {
      setIsLoading(false);
    }
  }, [courseId]);

  if (isLoading) {
    return (
      <div className="space-y-6">
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
    );
  }

  if (error || !course) {
    return (
        <Card className="flex flex-col items-center justify-center h-full min-h-[300px] text-center p-8 border-dashed">
            <AlertTriangle className="h-12 w-12 text-destructive" />
            <h3 className="mt-4 text-xl font-semibold font-headline">Error Loading Course</h3>
            <p className="mt-2 text-sm text-muted-foreground">
                {error || 'The course you are looking for could not be displayed.'}
            </p>
            <Button asChild className="mt-4" variant="outline">
                <Link href="/dashboard/courses">
                    <ArrowLeft className="mr-2" /> Back to My Courses
                </Link>
            </Button>
        </Card>
    );
  }

  return (
    <div className="space-y-6">
       <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/courses">
                <ArrowLeft className="mr-2" /> Back to My Courses
            </Link>
       </Button>
        
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">{course.title}</CardTitle>
          <CardDescription className="text-base">{course.summary}</CardDescription>
        </CardHeader>
        <CardContent>
          <h4 className="font-semibold mb-2 text-xl font-headline">Lessons</h4>
          <Accordion type="single" collapsible className="w-full">
            {course.lessons.map((lesson, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg hover:no-underline">{`${index + 1}. ${lesson.title}`}</AccordionTrigger>
                <AccordionContent className="space-y-6 pt-4">
                  {lesson.sections.map((section, sIndex) => (
                    <div key={sIndex} className="space-y-2 pl-4 border-l-4 border-primary/30">
                      <h5 className="font-semibold text-base">{`${index + 1}.${sIndex + 1} ${section.title}`}</h5>
                      <p className="text-muted-foreground whitespace-pre-wrap text-base leading-relaxed">{section.content}</p>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 space-y-6 border-t pt-6">
              <div>
                  <h4 className="font-headline text-xl flex items-center gap-2"><BookText className="size-5 text-primary" />Final Review</h4>
                  <p className="text-muted-foreground mt-2 text-base leading-relaxed">{course.finalReview}</p>
              </div>
                <div>
                  <h4 className="font-headline text-xl flex items-center gap-2"><Rocket className="size-5 text-primary" />Project Suggestion</h4>
                  <p className="text-muted-foreground mt-2 text-base leading-relaxed">{course.projectSuggestion}</p>
              </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
