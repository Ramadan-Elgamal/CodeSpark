'use server';

/**
 * @fileOverview An AI agent for generating a full, high-quality programming course.
 *
 * - generateCourse - A function that handles the entire course generation process.
 * - GenerateCourseInput - The input type for the generateCourse function.
 * - GenerateCourseOutput - The return type for the generateCourse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCourseInputSchema = z.object({
  topic: z.string().describe('The main topic for the course.'),
  lessonCount: z.number().min(3).max(20).describe('The number of lessons to create.'),
});
export type GenerateCourseInput = z.infer<typeof GenerateCourseInputSchema>;

const GenerateCourseOutputSchema = z.object({
    title: z.string().describe("A compelling and informative title for the course."),
    summary: z.string().describe("A concise summary of what the course covers."),
    lessons: z.array(z.object({
        title: z.string().describe("The title of the lesson."),
        introduction: z.string().describe("A clear, short introduction to the lesson's topic."),
        sections: z.array(z.object({
            title: z.string().describe("The title of the section."),
            content: z.string().describe("A detailed explanation of the section's content, including examples or code snippets where relevant.")
        })).describe("2 to 4 sections that make up the lesson."),
        summary: z.string().describe("A quick summary or recap of the key points covered in the lesson.")
    })).describe("An array of lessons that make up the course content."),
    finalReview: z.string().describe("A final review of the key concepts covered in the entire course."),
    projectSuggestion: z.string().describe("A small project or exercise suggestion that uses what the student learned in the course.")
});
export type GenerateCourseOutput = z.infer<typeof GenerateCourseOutputSchema>;


export async function generateCourse(input: GenerateCourseInput): Promise<GenerateCourseOutput> {
  return generateCourseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCoursePrompt',
  input: {schema: GenerateCourseInputSchema},
  output: {schema: GenerateCourseOutputSchema},
  prompt: `You are an expert programming instructor and technical writer.

Your task is to generate a full, high-quality course on a given programming topic. The course should be structured as a series of lessons. Each lesson must include:

- A lesson title
- A clear, short introduction
- 2 to 4 sections per lesson, each with:
  - A section title
  - A detailed explanation (including examples, code, or visual descriptions where relevant)
- A quick summary or recap at the end of the lesson

The content should be beginner-friendly but technically accurate, and use clear language. Each lesson should build logically on the previous one.

At the end of the full course, include:
- A final review of key concepts
- A small project or exercise suggestion that uses what the student learned

The format should be well-organized, suitable for web or PDF display, and easy to split into lessons in an app.

The topic for the course is: {{{topic}}}
The number of lessons to generate is: {{{lessonCount}}}.
`,
});

const generateCourseFlow = ai.defineFlow(
  {
    name: 'generateCourseFlow',
    inputSchema: GenerateCourseInputSchema,
    outputSchema: GenerateCourseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
