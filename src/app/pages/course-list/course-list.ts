import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CourseCard } from '../../components/course-card/course-card';
import { Highlight } from '../../directives/highlight';
import { CourseService } from '../../services/course';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EnrollmentService } from '../../services/enrollment';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCard, Highlight, FormsModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  isLoading = true;
  errorMessage = '';
  courses: any[] = [];
  selectedCourseId: number | null = null;
  private courseSelection$ = new Subject<number>();
students: any[] = [];
  searchTerm: string = '';

  constructor(
  private cdr: ChangeDetectorRef,
  private courseService: CourseService,
  private enrollmentService: EnrollmentService,
  private router: Router,
  private route: ActivatedRoute
) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
  next: (courses) => {
    this.courses = courses;
  },
  error: (err) => {
    this.errorMessage = err.message;
  },
  complete: () => {
    this.isLoading = false;
  }
});

this.courseSelection$
  .pipe(
    switchMap(courseId =>
      this.enrollmentService.getStudentsByCourse(courseId)
    )
  )
  .subscribe({
    next: (students) => {
      this.students = students;
      console.log('Students loaded:', students);
    }
  });
  // switchMap cancels the previous HTTP request when a new course is selected,
// preventing outdated responses from updating the UI.

    // Read search query parameter from URL on load and changes
    this.route.queryParamMap.subscribe(params => {
      this.searchTerm = params.get('search') || '';
    });

    
  }

  onEnroll(courseId: number): void {
  console.log('Enrolling in course: ' + courseId);

  this.selectedCourseId = courseId;

  this.courseSelection$.next(courseId);
}

  // Navigate to course detail page when a card is clicked
  viewCourseDetails(courseId: number): void {
    this.router.navigate(['courses', courseId]);
  }

  // Update query params in the URL when user searches
  onSearchChange(): void {
    this.router.navigate(['courses'], {
      queryParams: { search: this.searchTerm || null }
    });
  }

  // trackBy improves performance by allowing Angular to reuse existing DOM elements
  trackByCourseId(index: number, course: any): number {
    return course.id;
  }
}