'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookCopy, ArrowRight } from 'lucide-react';
import type { GenerateCourseOutput } from '@/ai/flows/generate-course';

export default function MyCoursesPage() {
  const [savedCourses, setSavedCourses] = useState<GenerateCourseOutput[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem('savedCourses');
      if (item) {
        setSavedCourses(JSON.parse(item));
      }
    } catch (error) {
      console.error("Failed to parse saved courses from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDelete = (indexToDelete: number) => {
    const updatedCourses = savedCourses.filter((_, index) => index !== indexToDelete);
    setSavedCourses(updatedCourses);
    localStorage.setItem('savedCourses', JSON.stringify(updatedCourses));
  };
  
  if (isLoading) {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-headline text-2xl font-bold tracking-tight sm:text-3xl">My Courses</h1>
                <p className="text-muted-foreground">
                Here are all the courses you have generated and saved.
                </p>
            </div>
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <div className="h-6 w-3/4 bg-muted animate-pulse rounded-md" />
                            <div className="h-4 w-full mt-2 bg-muted animate-pulse rounded-md" />
                        </CardHeader>
                        <CardContent>
                             <div className="h-4 w-1/2 bg-muted animate-pulse rounded-md" />
                        </CardContent>
                        <CardFooter>
                            <div className="h-10 w-24 bg-muted animate-pulse rounded-md" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
  }


  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-2xl font-bold tracking-tight sm:text-3xl">My Courses</h1>
        <p className="text-muted-foreground">
          Here are all the courses you have generated and saved.
        </p>
      </div>

      {savedCourses.length === 0 ? (
        <Card className="flex flex-col items-center justify-center h-full min-h-[300px] text-center p-8 border-dashed">
            <BookCopy className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold font-headline">No Courses Saved Yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
            Generate a course and save it to see it appear here.
            </p>
            <Button asChild className="mt-4">
                <Link href="/dashboard/generate">Generate a Course</Link>
            </Button>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {savedCourses.map((course, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline text-xl">{course.title}</CardTitle>
                <CardDescription className="line-clamp-3">{course.summary}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{course.lessons.length} lessons</p>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                <Button asChild size="sm">
                  <Link href={`/dashboard/courses/${index}`}>
                    View Course <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button variant="destructive-outline" size="sm" onClick={() => handleDelete(index)}>
                    Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
