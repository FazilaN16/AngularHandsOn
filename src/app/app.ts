import { Component, signal } from '@angular/core';

import { Header } from './components/header/header';
import { ReactiveEnrollment } from './pages/reactive-enrollment/reactive-enrollment';
import { CourseSummaryWidget } from './components/course-summary-widget/course-summary-widget';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Header,
    ReactiveEnrollment,
    CourseSummaryWidget
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AngularHandsOn');
}