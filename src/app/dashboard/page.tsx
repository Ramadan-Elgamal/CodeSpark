
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, PenSquare, BookCopy, History, Wand2, Save } from 'lucide-react';
import type { GenerateCourseOutput } from '@/ai/flows/generate-course';

interface Activity {
    type: 'generate' | 'save';
    courseTitle: string;
    timestamp: number;
}

const getIconForActivity = (type: Activity['type']) => {
    switch (type) {
        case 'generate':
            return <Wand2 className="h-4 w-4" />;
        case 'save':
            return <Save className="h-4 w-4" />;
        default:
            return <History className="h-4 w-4" />;
    }
};

export default function DashboardPage() {
  const [savedCourses, setSavedCourses] = useState<GenerateCourseOutput[]>([]);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedCoursesItem = window.localStorage.getItem('savedCourses');
      if (savedCoursesItem) {
        setSavedCourses(JSON.parse(savedCoursesItem));
      }

      const activitiesItem = window.localStorage.getItem('recentActivities');
      if (activitiesItem) {
        setRecentActivities(JSON.parse(activitiesItem));
      }

    } catch (error) {
      console.error("Failed to parse from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return (
    <div className="grid gap-6">
      <div className="space-y-1.5">
        <h1 className="font-headline text-2xl font-bold tracking-tight sm:text-3xl">Welcome to Your Dashboard</h1>
        <p className="text-muted-foreground">Here's a quick overview of what you can do.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>A log of your recent course generations and saves.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {isLoading ? (
                         [...Array(3)].map((_, i) => (
                             <div key={i} className="flex items-start gap-4">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground mt-1 animate-pulse" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-3/4 bg-muted animate-pulse rounded-md" />
                                    <div className="h-3 w-1/4 bg-muted animate-pulse rounded-md" />
                                </div>
                            </div>
                        ))
                    ) : recentActivities.length > 0 ? (
                        recentActivities.map((activity, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground mt-1">
                                    {getIconForActivity(activity.type)}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">
                                        {activity.type === 'generate' ? 'Generated course:' : 'Saved course:'} <span className="font-normal">"{activity.courseTitle}"</span>
                                    </p>
                                    <p className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-center text-muted-foreground py-8">No recent activity yet. Generate a course to get started!</p>
                    )}
                </div>
            </CardContent>
        </Card>
        <div className="space-y-6">
            <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                <PenSquare className="h-5 w-5 text-primary" />
                <span>Generate a New Course</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Start creating a new programming course with the power of AI.</p>
                <Button asChild>
                <Link href="/dashboard/generate">
                    Start Generating <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                </Button>
            </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                    <BookCopy className="h-5 w-5 text-primary" />
                    <span>Saved Courses</span>
                    </CardTitle>
                    <CardDescription>A quick look at your most recent courses.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="space-y-2">
                            <div className="h-4 w-3/4 bg-muted animate-pulse rounded-md" />
                            <div className="h-4 w-1/2 bg-muted animate-pulse rounded-md" />
                        </div>
                    ) : savedCourses.length > 0 ? (
                        <ul className="space-y-3">
                            {savedCourses.slice(0, 2).map((course, index) => (
                                <li key={index} className="flex items-center justify-between text-sm">
                                    <Link href={`/dashboard/courses/${savedCourses.length - 1 - index}`} className="font-medium hover:underline truncate" title={course.title}>
                                        {course.title}
                                    </Link>
                                    <span className="text-xs text-muted-foreground">{course.lessons.length} {course.isProjectBased ? 'projects' : 'lessons'}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground">No courses saved yet.</p>
                    )}
                </CardContent>
                <CardFooter>
                    <Button asChild variant="secondary" className="w-full">
                        <Link href="/dashboard/courses">
                            View All Courses <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
