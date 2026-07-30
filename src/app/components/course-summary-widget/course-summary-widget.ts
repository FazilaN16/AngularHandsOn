import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css'
})
export class CourseSummaryWidget implements OnInit {

  totalCourses = 0;

  constructor(private courseService: CourseService) {}

 ngOnInit(): void {

  console.log('CourseSummaryWidget loaded');

  this.courseService.getCourses().subscribe({
    next: (courses) => {
      console.log('Courses received:', courses);
      this.totalCourses = courses.length;
    },
    error: (err) => {
      console.error('HTTP Error:', err);
    }
  });

}

}