
'use server';

import { z } from 'zod';
import { generateCourse, GenerateCourseOutput } from '@/ai/flows/generate-course';

const coursePhaseToLessonCount: Record<string, number> = {
  fundamentals: 5,
  core: 8,
  advanced: 12,
  real_world: 15,
};

const coursePhaseToLabel: Record<string, string> = {
  fundamentals: 'Fundamentals Phase',
  core: 'Core Projects Phase',
  advanced: 'Advanced Concepts Phase',
  real_world: 'Real World Projects Phase',
};


const courseGenerationSchema = z.object({
  topic: z.string().min(3, { message: 'Topic must be at least 3 characters long.' }),
  lessonCount: z.string().refine((val) => Object.keys(coursePhaseToLessonCount).includes(val), {
    message: 'Invalid course phase selected.',
  }),
});

export type CourseResult = GenerateCourseOutput;

export interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
  courseResult?: CourseResult;
}

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
    return { status: 'error', message: 'An unexpected error occurred during course generation.' };
  }
}
