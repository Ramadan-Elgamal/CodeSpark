import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, PenSquare, BookCopy } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <div className="space-y-1.5">
        <h1 className="font-headline text-2xl font-bold tracking-tight sm:text-3xl">Welcome to Your Dashboard</h1>
        <p className="text-muted-foreground">Here's a quick overview of what you can do.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <PenSquare className="h-5 w-5 text-primary" />
              <span>Generate a New Course</span>
            </CardTitle>
            <CardDescription>Start creating a new programming course with the power of AI.</CardDescription>
          </CardHeader>
          <CardContent>
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
              <span>View Your Courses</span>
            </CardTitle>
            <CardDescription>Access and manage all the courses you have saved.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="secondary">
              <Link href="/dashboard/courses">
                My Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
