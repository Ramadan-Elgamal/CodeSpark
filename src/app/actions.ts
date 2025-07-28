
'use server';

import { z } from 'zod';
import { generateCourse, GenerateCourseOutput } from '@/ai/flows/generate-course';

const coursePhaseToLabel: Record<string, string> = {
  fundamentals: 'Fundamentals Phase',
  intermediate: 'Intermediate Phase',
  advanced: 'Advanced Concepts Phase',
};


const courseGenerationSchema = z.object({
  topic: z.string().min(3, { message: 'Topic must be at least 3 characters long.' }),
  lessonCount: z.string().refine((val) => Object.keys(coursePhaseToLabel).includes(val), {
    message: 'Invalid course phase selected.',
  }),
});

export type CourseResult = GenerateCourseOutput;

export interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
  courseResult?: CourseResult;
}

const createMockCourse = (topic: string): CourseResult => ({
  title: `Placeholder: ${topic} Fundamentals`,
  summary: `This is a sample course for "${topic}". The AI is currently unavailable, but you can explore the structure of a typical course.`,
  isProjectBased: false,
  lessons: [
    {
      title: 'Introduction to Core Concepts',
      description: 'An overview of the fundamental principles of the topic.',
      microLessons: [
        {
          title: 'Setup & Installation',
          description: 'A step-by-step guide to getting your development environment ready.',
          resources: {
            free: [
              { title: 'Official Documentation', url: '#', platform: 'Docs' },
            ],
          },
        },
        {
          title: '"Hello World" Example',
          description: 'Creating your very first simple application to understand the basics.',
          resources: {},
        },
      ],
    },
    {
      title: 'Diving Deeper',
      description: 'Exploring more advanced features and concepts.',
      microLessons: [
        {
          title: 'Key Feature A',
          description: 'Understanding and implementing a core feature of this technology.',
          resources: {
            paid: [
              { title: 'In-Depth Course', url: '#', platform: 'Udemy' },
            ],
          },
        },
      ],
    },
  ],
  finalNote: "Remember to try generating your course again later when the AI service is back online. Happy coding!",
});


export async function generateCourseAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = courseGenerationSchema.safeParse({
    topic: formData.get('topic'),
    lessonCount: formData.get('lessonCount'),
  });

  if (!validatedFields.success) {
    const error = validatedFields.error.flatten().fieldErrors;
    const message = error.topic?.[0] || error.lessonCount?.[0] || 'Invalid input.';
    return {
      status: 'error',
      message,
    };
  }
  
  const { topic, lessonCount: lessonCountKey } = validatedFields.data;
  const phase = coursePhaseToLabel[lessonCountKey];

  try {
    const courseResult = await generateCourse({
      topic,
      phase,
    });

    if (!courseResult) {
      return { status: 'error', message: 'Failed to generate the course.' };
    }

    return {
      status: 'success',
      message: 'Course generated successfully!',
      courseResult,
    };
  } catch (error) {
    console.error(error);
    const mockCourse = createMockCourse(topic);
    return { 
      status: 'success', 
      message: 'The AI is currently unavailable. Here is a sample course to explore.',
      courseResult: mockCourse 
    };
  }
}
