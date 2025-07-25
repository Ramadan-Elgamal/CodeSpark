import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookCopy } from 'lucide-react';

export default function MyCoursesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-2xl font-bold tracking-tight sm:text-3xl">My Courses</h1>
        <p className="text-muted-foreground">
          Here are all the courses you have generated and saved.
        </p>
      </div>
      <Card className="flex flex-col items-center justify-center h-full min-h-[300px] text-center p-8 border-dashed">
        <BookCopy className="h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-xl font-semibold font-headline">No Courses Saved Yet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Generate a course and save it to see it appear here.
        </p>
      </Card>
    </div>
  );
}
