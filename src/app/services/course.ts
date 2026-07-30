import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) {}

  private courses = [
    {
      id: 1,
      name: 'Data Structures',
      code: 'CS201',
      credits: 4,
      gradeStatus: 'passed'
    },
    {
      id: 2,
      name: 'Database Management',
      code: 'CS202',
      credits: 3,
      gradeStatus: 'pending'
    },
    {
      id: 3,
      name: 'Operating Systems',
      code: 'CS203',
      credits: 4,
      gradeStatus: 'passed'
    },
    {
      id: 4,
      name: 'Computer Networks',
      code: 'CS204',
      credits: 3,
      gradeStatus: 'failed'
    },
    {
      id: 5,
      name: 'Software Engineering',
      code: 'CS205',
      credits: 3,
      gradeStatus: 'pending'
    }
  ];

  getCourses(): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:3000/courses').pipe(

  retry(2),

  map(courses => courses.filter(course => course.credits > 0)),

  tap(courses => {
    console.log('Courses loaded:', courses.length);
  }),

  catchError(err => {
    console.error(err);
    return throwError(() => new Error('Failed to load courses. Please try again.'));
  })

); }

  getCourseById(id: number) {
    return this.courses.find(course => course.id === id);
  }

  createCourse(course: any): Observable<any> {
  return this.http.post<any>(
    'http://localhost:3000/courses',
    course
  );
}
updateCourse(id: number, course: any): Observable<any> {
  return this.http.put<any>(
    `http://localhost:3000/courses/${id}`,
    course
  );
}
deleteCourse(id: number): Observable<any> {
  return this.http.delete<any>(
    `http://localhost:3000/courses/${id}`
  );
}

  addCourse(course: any): void {
    this.courses.push(course);
  }

}