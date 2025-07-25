'use server';

/**
 * @fileOverview A lesson plan generator AI agent.
 *
 * - generateLessonPlans - A function that handles the lesson plan generation process.
 * - GenerateLessonPlansInput - The input type for the generateLessonPlans function.
 * - GenerateLessonPlansOutput - The return type for the generateLessonPlans function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLessonPlansInputSchema = z.object({
  topic: z.string().describe('The topic of the course.'),
  lessonCount: z.number().describe('The number of lessons to generate.'),
  courseSummary: z.string().describe('The summary of the entire course.'),
});
export type GenerateLessonPlansInput = z.infer<typeof GenerateLessonPlansInputSchema>;

const GenerateLessonPlansOutputSchema = z.array(
  z.object({
    title: z.string().describe('The title of the lesson.'),
    description: z.string().describe('A short description of the lesson.'),
  })
);
export type GenerateLessonPlansOutput = z.infer<typeof GenerateLessonPlansOutputSchema>;

export async function generateLessonPlans(input: GenerateLessonPlansInput): Promise<GenerateLessonPlansOutput> {
  return generateLessonPlansFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLessonPlansPrompt',
  input: {schema: GenerateLessonPlansInputSchema},
  output: {schema: GenerateLessonPlansOutputSchema},
  prompt: `You are an AI assistant that generates a list of lesson plans for a course.

  The course is about: {{{topic}}}.
  The number of lessons to generate is: {{{lessonCount}}}.
  The course summary is: {{{courseSummary}}}.

  Generate a list of {{{lessonCount}}} lesson plans for the course.

  Each lesson plan should have a title and a short description.

  The output should be a JSON array of lesson plans.
  `,
});

const generateLessonPlansFlow = ai.defineFlow(
  {
    name: 'generateLessonPlansFlow',
    inputSchema: GenerateLessonPlansInputSchema,
    outputSchema: GenerateLessonPlansOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
