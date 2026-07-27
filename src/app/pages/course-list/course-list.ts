import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';
import { Highlight } from '../../directives/highlight';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCard, Highlight],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit{
  isLoading = true;

  courses = [
  {
    id: 1,
    name: 'Angular Basics',
    code: 'ANG101',
    credits: 4,
    gradeStatus: 'passed'
  },
  {
    id: 2,
    name: 'Java Programming',
    code: 'JAVA201',
    credits: 3,
    gradeStatus: 'failed'
  },
  {
    id: 3,
    name: 'Database Systems',
    code: 'DB301',
    credits: 4,
    gradeStatus: 'pending'
  },
  {
    id: 4,
    name: 'Web Development',
    code: 'WEB401',
    credits: 3,
    gradeStatus: 'passed'
  },
  {
    id: 5,
    name: 'Data Structures',
    code: 'DS501',
    credits: 4,
    gradeStatus: 'pending'
  }
];

  selectedCourseId: number | null = null;
  constructor(private cdr: ChangeDetectorRef) {}

  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }

  // trackBy improves performance by allowing Angular to reuse existing DOM elements
trackByCourseId(index: number, course: any): number {
  return course.id;
}
  
ngOnInit(): void {
  setTimeout(() => {
    this.isLoading = false;
    this.cdr.detectChanges();
  }, 1500);
}

}