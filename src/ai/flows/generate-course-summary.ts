'use server';

/**
 * @fileOverview An AI agent for generating a concise summary of a generated course.
 *
 * - generateCourseSummary - A function that handles the course summary generation process.
 * - GenerateCourseSummaryInput - The input type for the generateCourseSummary function.
 * - GenerateCourseSummaryOutput - The return type for the generateCourseSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCourseSummaryInputSchema = z.object({
  courseTitle: z.string().describe('The title of the generated course.'),
  lessons: z.array(z.string()).describe('A list of lessons in the course.'),
});
export type GenerateCourseSummaryInput = z.infer<typeof GenerateCourseSummaryInputSchema>;

const GenerateCourseSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the generated course.'),
});
export type GenerateCourseSummaryOutput = z.infer<typeof GenerateCourseSummaryOutputSchema>;

export async function generateCourseSummary(input: GenerateCourseSummaryInput): Promise<GenerateCourseSummaryOutput> {
  return generateCourseSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCourseSummaryPrompt',
  input: {schema: GenerateCourseSummaryInputSchema},
  output: {schema: GenerateCourseSummaryOutputSchema},
  prompt: `You are an AI assistant that specializes in summarizing programming courses.

  Given the title and lessons of a course, generate a concise summary that captures the main focus and learning objectives of the course.

  Course Title: {{{courseTitle}}}
  Lessons:
  {{#each lessons}}- {{{this}}}\n{{/each}}
  Summary:`,
});

const generateCourseSummaryFlow = ai.defineFlow(
  {
    name: 'generateCourseSummaryFlow',
    inputSchema: GenerateCourseSummaryInputSchema,
    outputSchema: GenerateCourseSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
