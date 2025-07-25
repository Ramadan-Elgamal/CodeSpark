
'use server';

/**
 * @fileOverview An AI agent for generating a high-level programming course curriculum.
 *
 * - generateCourse - A function that handles the course generation process.
 * - GenerateCourseInput - The input type for the generateCourse function.
 * - GenerateCourseOutput - The return type for the generateCourse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCourseInputSchema = z.object({
  topic: z.string().describe('The main topic for the course.'),
  phase: z.string().describe("The phase of learning the course is for (e.g., 'Fundamentals', 'Intermediate', 'Advanced Concepts')."),
});
export type GenerateCourseInput = z.infer<typeof GenerateCourseInputSchema>;

const MicroLessonSchema = z.object({
    title: z.string().describe("The title of the micro-lesson or a specific sub-topic/feature."),
    description: z.string().describe("A detailed description of the micro-lesson content."),
});

const LessonSchema = z.object({
    title: z.string().describe("The title of the main lesson or project."),
    microLessons: z.array(MicroLessonSchema).describe("An array of micro-lessons that break down the main lesson."),
});

const GenerateCourseOutputSchema = z.object({
    title: z.string().describe("A compelling and informative title for the course/roadmap."),
    summary: z.string().describe("A concise summary of what the curriculum covers."),
    isProjectBased: z.boolean().describe("A flag to indicate if the curriculum is project-based."),
    lessons: z.array(LessonSchema).describe("An array of lessons, each containing nested micro-lessons."),
    finalNote: z.string().describe("A final concluding note or piece of advice for the learner.")
});
export type GenerateCourseOutput = z.infer<typeof GenerateCourseOutputSchema>;


export async function generateCourse(input: GenerateCourseInput): Promise<GenerateCourseOutput> {
  return generateCourseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCoursePrompt',
  input: {schema: GenerateCourseInputSchema},
  output: {schema: GenerateCourseOutputSchema},
  prompt: `You are an expert programming instructor and curriculum designer.

Your task is to generate a high-level curriculum for a given programming topic, structured as a series of lessons, each broken down into micro-lessons.

**Instructions:**

1.  **Analyze the Phase:**
    *   For **'Fundamentals Phase'**, **'Intermediate Phase'**, or **'Advanced Concepts Phase'**: Create lessons focused on core concepts. Each lesson should be broken down into micro-lessons explaining specific sub-topics. Set \`isProjectBased\` to \`false\`. The curriculum should be based on concepts, not projects.
    
2.  **Generate the Curriculum:**
    *   **Title and Summary:** Create a compelling title and a concise summary for the overall curriculum.
    *   **Lessons & Micro-Lessons:**
        *   Generate a series of main **lessons**.
        *   For each lesson, generate 2-5 **micro-lessons**. Each micro-lesson needs a title and a description.
    *   **Final Note:** Include a brief, encouraging final note.

3.  **Determine Length:** Based on the topic and phase, determine the appropriate number of lessons required for a comprehensive overview.

The topic for the course is: {{{topic}}}
The course should be tailored for the '{{{phase}}}' phase of learning.
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
