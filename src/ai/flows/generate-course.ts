
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
  phase: z.string().describe("The phase of learning the course is for (e.g., 'Fundamentals', 'Core Projects')."),
});
export type GenerateCourseInput = z.infer<typeof GenerateCourseInputSchema>;

const CurriculumItemSchema = z.object({
    title: z.string().describe("The title of the curriculum item (e.g., a concept, a topic, or a project name)."),
    description: z.string().describe("A detailed description of what this item covers or what the project entails."),
});

const GenerateCourseOutputSchema = z.object({
    title: z.string().describe("A compelling and informative title for the course/roadmap."),
    summary: z.string().describe("A concise summary of what the curriculum covers."),
    isProjectBased: z.boolean().describe("A flag to indicate if the curriculum is project-based."),
    curriculum: z.array(CurriculumItemSchema).describe("An array of curriculum items, which can be concepts or projects."),
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

Your task is to generate a high-level curriculum or learning roadmap for a given programming topic and learning phase. You are not writing the full course content, but outlining the structure.

**Instructions:**

1.  **Analyze the Phase:** The user will provide a 'phase' of learning.
    *   If the phase is **'Fundamentals Phase'** or **'Advanced Concepts Phase'**, your output should be a list of key concepts, skills, and topics the learner needs to master. Set \`isProjectBased\` to \`false\`.
    *   If the phase is **'Core Projects Phase'** or **'Real World Projects Phase'**, your output should be a list of project ideas that a learner should build to practice their skills. Set \`isProjectBased\` to \`true\`. Each project should be a curriculum item.

2.  **Generate the Curriculum:**
    *   **Title and Summary:** Create a compelling title and a concise summary for the overall curriculum.
    *   **Curriculum Items:** For each item in the curriculum (whether it's a concept or a project), provide a clear 'title' and a 'description'.
        *   For concepts, the description should explain what the concept is and why it's important.
        *   For projects, the description should outline the project's goal, key features, and the skills it will help develop.
    *   **Final Note:** Include a brief, encouraging final note for the learner.

3.  **Determine Length:** Based on the topic and phase, you must determine the appropriate number of curriculum items required for a comprehensive overview.

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
