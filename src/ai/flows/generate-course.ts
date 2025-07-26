
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

const ResourceLinkSchema = z.object({
    title: z.string().describe("The title of the resource or video."),
    url: z.string().url().describe("The direct URL to the resource."),
    platform: z.string().describe("The platform where the resource is hosted (e.g., YouTube, Udemy, Coursera, official docs)."),
});

const MicroLessonSchema = z.object({
    title: z.string().describe("The title of the micro-lesson or a specific sub-topic/feature."),
    description: z.string().describe("A detailed and comprehensive description of the micro-lesson content, explaining the concept thoroughly."),
    resources: z.object({
        free: z.array(ResourceLinkSchema).describe("An array of links to free resources (e.g., YouTube videos, articles, documentation).").optional(),
        paid: z.array(ResourceLinkSchema).describe("An array of links to paid courses (e.g., Udemy, Coursera).").optional(),
    }).describe("A collection of resources to supplement the micro-lesson.").optional(),
});

const LessonSchema = z.object({
    title: z.string().describe("The title of the main lesson or project."),
    description: z.string().describe("A detailed and comprehensive description of the lesson content, explaining the concept thoroughly."),
    microLessons: z.array(MicroLessonSchema).describe("An array of comprehensive micro-lessons that break down the main lesson.").optional(),
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

Your task is to generate a comprehensive and detailed curriculum for a given programming topic, structured as a series of lessons, each broken down into micro-lessons.

**Instructions:**

1.  **Analyze the Phase:**
    *   For **'Fundamentals Phase'**, **'Intermediate Phase'**, or **'Advanced Concepts Phase'**: Create lessons focused on core concepts. Each lesson should be broken down into micro-lessons explaining specific sub-topics. Set \`isProjectBased\` to \`false\`. The curriculum should be based on concepts, not projects.
    
2.  **Generate the Curriculum:**
    *   **Title and Summary:** Create a compelling title and a concise summary for the overall curriculum.
    *   **Lessons & Micro-Lessons:**
        *   Generate a series of main **lessons** that logically progress through the topic.
        *   For each lesson, generate 3-5 comprehensive **micro-lessons**. Each micro-lesson needs a clear title and a detailed, in-depth description that thoroughly explains the concept. Assume the learner is new to the specific concept being taught in the micro-lesson.
    *   **Find Resources:** For **EACH** micro-lesson, you must find relevant learning resources.
        *   **Free Resources:** Find 1-2 high-quality, relevant free resources. These can be YouTube videos, official documentation pages, or in-depth articles. Provide a clear title, the full URL, and the platform name (e.g., 'YouTube', 'Official Docs').
        *   **Paid Resources:** Find 1 optional paid resource, like a course on Udemy or Coursera that specifically covers the micro-lesson's topic. Provide the title, URL, and platform.
    *   **Final Note:** Include a brief, encouraging final note.

3.  **Determine Length:** Based on the topic and phase, determine the appropriate number of lessons required for a comprehensive overview. Don't be afraid to create a large number of lessons if the topic requires it.

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
