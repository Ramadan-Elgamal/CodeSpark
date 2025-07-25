import { CourseGenerator } from '@/components/dashboard/CourseGenerator';

export default function GenerateCoursePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-2xl font-bold tracking-tight sm:text-3xl">Course Generator</h1>
        <p className="text-muted-foreground">
          Tell us your topic, and our AI will craft a bite-sized course for you.
        </p>
      </div>
      <CourseGenerator />
    </div>
  );
}
