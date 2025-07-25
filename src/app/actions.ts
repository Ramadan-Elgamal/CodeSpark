
'use server';

import { z } from 'zod';
import { generateCourse, GenerateCourseOutput } from '@/ai/flows/generate-course';

const courseGenerationSchema = z.object({
  topic: z.string().min(3, { message: 'Topic must be at least 3 characters long.' }),
  lessonCount: z.coerce.number().min(3).max(20),
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
    return {
      status: 'error',
      message: validatedFields.error.flatten().fieldErrors.topic?.[0] || 'Invalid input.',
    };
  }
  
  const { topic, lessonCount } = validatedFields.data;

  try {
    const courseResult = await generateCourse({
      topic,
      lessonCount,
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
