import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
// Adjust the relative path depending on where your services folder is relative to store/course/
// If services is in src/app/services/, use '../../services/course.service'
import { CourseService } from '../../services/course'; 
import { Course, loadCourses, loadCoursesSuccess, loadCoursesFailure } from './course.actions';

@Injectable()
export class CourseEffects {
  private actions$ = inject(Actions);
  private courseService = inject(CourseService);

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCourses),
      switchMap(() =>
        this.courseService.getCourses().pipe(
          // Cast the response data explicitly to Course[] to satisfy TypeScript strict mode
          map((courses) => loadCoursesSuccess({ courses: courses as Course[] })),
          catchError((error) => of(loadCoursesFailure({ error: error.message })))
        )
      )
    )
  );
}