import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course, loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading } from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="loading$ | async">Loading courses...</div>
    
    <div class="course-container">
      <!-- Render using the async pipe as required in Step 96 -->
      <div *ngFor="let course of courses$ | async">
        <h3>{{ course.title }}</h3>
        <p>{{ course.description }}</p>
      </div>
    </div>
  `
})
export class CourseList implements OnInit {
  courses$: Observable<Course[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    // Select the state slices using memoised selectors
    this.courses$ = this.store.select(selectAllCourses);
    this.loading$ = this.store.select(selectCoursesLoading);
  }

  ngOnInit(): void {
    // Dispatch the load action when the component initializes
    this.store.dispatch(loadCourses());
  }
}