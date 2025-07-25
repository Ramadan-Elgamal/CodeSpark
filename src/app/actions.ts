
'use server';

import { z } from 'zod';
import { generateLessonPlans, GenerateLessonPlansOutput } from '@/ai/flows/generate-lesson-plans';
import { generateCourseSummary } from '@/ai/flows/generate-course-summary';

const courseGenerationSchema = z.object({
  topic: z.string().min(3, { message: 'Topic must be at least 3 characters long.' }),
  lessonCount: z.coerce.number().min(3).max(20),
});

export interface CourseResult {
  title: string;
  summary: string;
  lessons: GenerateLessonPlansOutput;
}

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
    // Step 1: Create a preliminary summary to bootstrap the lesson generation.
    const preliminarySummary = `An introductory course on ${topic}.`;

    // Step 2: Generate lesson plans based on the topic and preliminary summary.
    const lessons = await generateLessonPlans({
      topic,
      lessonCount,
      courseSummary: preliminarySummary,
    });

    if (!lessons || lessons.length === 0) {
      return { status: 'error', message: 'Failed to generate lesson plans.' };
    }

    // Step 3: Generate a more detailed summary based on the actual lesson titles.
    const { summary } = await generateCourseSummary({
      courseTitle: topic,
      lessons: lessons.map((lesson) => lesson.title),
    });
    
    if (!summary) {
        return { status: 'error', message: 'Failed to generate course summary.' };
    }

    return {
      status: 'success',
      message: 'Course generated successfully!',
      courseResult: {
        title: topic,
        summary,
        lessons,
      },
    };
  } catch (error) {
    console.error(error);
    return { status: 'error', message: 'An unexpected error occurred during course generation.' };
  }
}
