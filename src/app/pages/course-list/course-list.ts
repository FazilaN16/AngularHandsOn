import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CourseCard } from '../../components/course-card/course-card';
import { Highlight } from '../../directives/highlight';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCard, Highlight, FormsModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  isLoading = true;
  courses: any[] = [];
  selectedCourseId: number | null = null;
  searchTerm: string = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courses = this.courseService.getCourses();

    // Read search query parameter from URL on load and changes
    this.route.queryParamMap.subscribe(params => {
      this.searchTerm = params.get('search') || '';
    });

    setTimeout(() => {
      this.isLoading = false;
      this.cdr.detectChanges();
    }, 1500);
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
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