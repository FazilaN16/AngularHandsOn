import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './components/header/header';
import { CourseList } from './pages/course-list/course-list';
import { EnrollmentForm } from './pages/enrollment-form/enrollment-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, EnrollmentForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AngularHandsOn');
}
