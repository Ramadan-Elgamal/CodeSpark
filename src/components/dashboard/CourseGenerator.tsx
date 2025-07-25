
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { generateCourseAction, FormState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, Wand2, Save, View, Trash2, BookText, Rocket } from 'lucide-react';
import type { GenerateCourseOutput } from '@/ai/flows/generate-course';

const initialState: FormState = {
  status: 'idle',
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Generate Course
        </>
      )}
    </Button>
  );
}

const addActivity = (type: 'generate' | 'save', courseTitle: string) => {
    try {
        const activities = JSON.parse(localStorage.getItem('recentActivities') || '[]');
        const newActivity = {
            type,
            courseTitle,
            timestamp: Date.now(),
        };
        // Keep the list to a manageable size, e.g., 20 most recent
        const updatedActivities = [newActivity, ...activities].slice(0, 20);
        localStorage.setItem('recentActivities', JSON.stringify(updatedActivities));
    } catch (error) {
        console.error("Failed to save activity to localStorage", error);
    }
}


export function CourseGenerator() {
  const [state, formAction] = useFormState(generateCourseAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.status === 'error') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
    if (state.status === 'success' && state.courseResult) {
        addActivity('generate', state.courseResult.title);
    }
  }, [state, toast]);

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <form action={formAction}>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Course Details</CardTitle>
              <CardDescription>Provide a topic and desired length.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Input id="topic" name="topic" placeholder="e.g., Introduction to React" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lessonCount">Course Type</Label>
                <Select name="lessonCount" defaultValue="fundamentals">
                  <SelectTrigger id="lessonCount">
                    <SelectValue placeholder="Select course phase" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fundamentals">Fundamentals Phase</SelectItem>
                    <SelectItem value="core">Core Projects Phase</SelectItem>
                    <SelectItem value="advanced">Advanced Concepts Phase</SelectItem>
                    <SelectItem value="real_world">Real World Projects Phase</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </Card>
        </form>
      </div>

      <div className="lg:col-span-2">
        {state.status === 'loading' && <LoadingState />}
        {state.status === 'success' && state.courseResult && <ResultState courseResult={state.courseResult} />}
        {state.status !== 'loading' && state.status !== 'success' && <InitialState />}
      </div>
    </div>
  );
}

function InitialState() {
  return (
    <Card className="flex flex-col items-center justify-center h-full min-h-[300px] text-center p-8 border-dashed">
      <Wand2 className="h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-xl font-semibold font-headline">Your course will appear here</h3>
      <p className="mt-2 text-sm text-muted-foreground">Fill out the form and click "Generate" to see the magic happen.</p>
    </Card>
  );
}

function LoadingState() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-2/3 mt-1" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}


function ResultState({ courseResult }: { courseResult: GenerateCourseOutput }) {
    const { toast } = useToast();

    const handleSaveCourse = () => {
        try {
            const savedCourses = JSON.parse(localStorage.getItem('savedCourses') || '[]');
            savedCourses.unshift(courseResult);
            localStorage.setItem('savedCourses', JSON.stringify(savedCourses));
            addActivity('save', courseResult.title);
            toast({
                title: 'Course Saved!',
                description: 'Your new course has been saved to your library.',
            });
        } catch (error) {
            console.error("Failed to save course to localStorage", error);
            toast({
                title: 'Error Saving Course',
                description: 'There was a problem saving your course.',
                variant: 'destructive',
            });
        }
    };
    
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{courseResult.title}</CardTitle>
        <CardDescription>{courseResult.summary}</CardDescription>
      </CardHeader>
      <CardContent>
        <h4 className="font-semibold mb-2 text-lg">Lessons:</h4>
        <Accordion type="single" collapsible className="w-full">
          {courseResult.lessons.map((lesson, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-base">{`${index + 1}. ${lesson.title}`}</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p className="text-muted-foreground italic">{lesson.introduction}</p>
                {lesson.sections.map((section, sIndex) => (
                    <div key={sIndex} className="space-y-1 pl-4 border-l-2 border-primary/50">
                        <h5 className="font-semibold">{section.title}</h5>
                        <p className="text-muted-foreground whitespace-pre-wrap">{section.content}</p>
                    </div>
                ))}
                <div className="pt-2">
                    <h5 className="font-semibold">Lesson Recap</h5>
                    <p className="text-muted-foreground">{lesson.summary}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-6 space-y-4">
            <div>
                <h4 className="font-headline text-lg flex items-center gap-2"><BookText className="size-5 text-primary" />Final Review</h4>
                <p className="text-muted-foreground mt-1">{courseResult.finalReview}</p>
            </div>
             <div>
                <h4 className="font-headline text-lg flex items-center gap-2"><Rocket className="size-5 text-primary" />Project Suggestion</h4>
                <p className="text-muted-foreground mt-1">{courseResult.projectSuggestion}</p>
            </div>
        </div>

      </CardContent>
      <CardFooter className="flex-wrap gap-2">
        <Button onClick={handleSaveCourse}><Save className="mr-2 h-4 w-4" /> Save Course</Button>
        <Button variant="secondary"><View className="mr-2 h-4 w-4" /> View Full</Button>
        <Button variant="destructive-outline"><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
      </CardFooter>
    </Card>
  );
}
