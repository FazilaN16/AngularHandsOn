import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';
import { Highlight } from '../../directives/highlight';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCard, Highlight],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit{
  isLoading = true;

 courses: any[] = [];

  selectedCourseId: number | null = null;
  constructor(
  private cdr: ChangeDetectorRef,
  private courseService: CourseService
) {}

  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }

  // trackBy improves performance by allowing Angular to reuse existing DOM elements
trackByCourseId(index: number, course: any): number {
  return course.id;
}
  
ngOnInit(): void {
  this.courses = this.courseService.getCourses();
  setTimeout(() => {
    this.isLoading = false;
    this.cdr.detectChanges();
  }, 1500);
}

}