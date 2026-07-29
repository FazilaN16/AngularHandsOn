import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

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

  getCourses() {
    return this.courses;
  }

  getCourseById(id: number) {
    return this.courses.find(course => course.id === id);
  }

  addCourse(course: any): void {
    this.courses.push(course);
  }

}