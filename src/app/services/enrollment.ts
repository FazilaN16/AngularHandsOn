import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { CourseService } from './course';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private enrolledCourseIds: number[] = [];

  constructor(
  private courseService: CourseService,
  private http: HttpClient
) {}

  enroll(courseId: number): void {
    if (!this.enrolledCourseIds.includes(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds =
      this.enrolledCourseIds.filter(id => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourses(): Course[] {
    return this.enrolledCourseIds
      .map(id => this.courseService.getCourseById(id))
      .filter((course): course is Course => course !== undefined);
  }

  getStudentsByCourse(courseId: number): Observable<any[]> {
  return this.http.get<any[]>(
    `http://localhost:3000/students?courseId=${courseId}`
  );
}
}