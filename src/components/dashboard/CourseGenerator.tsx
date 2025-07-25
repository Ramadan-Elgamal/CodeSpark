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
import { Loader2, Wand2, Save, View, Trash2 } from 'lucide-react';

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
                <Label htmlFor="lessonCount">Course Length</Label>
                <Select name="lessonCount" defaultValue="5">
                  <SelectTrigger id="lessonCount">
                    <SelectValue placeholder="Select number of lessons" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Lessons</SelectItem>
                    <SelectItem value="10">10 Lessons</SelectItem>
                    <SelectItem value="15">15 Lessons</SelectItem>
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


function ResultState({ courseResult }: { courseResult: FormState['courseResult'] }) {
    if(!courseResult) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{courseResult.title}</CardTitle>
        <CardDescription>{courseResult.summary}</CardDescription>
      </CardHeader>
      <CardContent>
        <h4 className="font-semibold mb-2">Lessons:</h4>
        <Accordion type="single" collapsible className="w-full">
          {courseResult.lessons.map((lesson, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{`${index + 1}. ${lesson.title}`}</AccordionTrigger>
              <AccordionContent>{lesson.description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
      <CardFooter className="flex-wrap gap-2">
        <Button><Save className="mr-2 h-4 w-4" /> Save Course</Button>
        <Button variant="secondary"><View className="mr-2 h-4 w-4" /> View Full</Button>
        <Button variant="destructive-outline"><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
      </CardFooter>
    </Card>
  );
}
