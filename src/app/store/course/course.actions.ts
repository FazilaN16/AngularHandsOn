import { createAction, props } from '@ngrx/store';

// Define a Course interface or import it from your models folder if you have one
export interface Course {
  id: number;
  title: string;
  description: string;
}

export const loadCourses = createAction('[Course] Load Courses');

export const loadCoursesSuccess = createAction(
  '[Course] Load Courses Success',
  props<{ courses: Course[] }>()
);

export const loadCoursesFailure = createAction(
  '[Course] Load Courses Failure',
  props<{ error: string }>()
);