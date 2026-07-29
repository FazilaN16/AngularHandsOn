import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './components/header/header';
import { ReactiveEnrollment } from './pages/reactive-enrollment/reactive-enrollment';
@Component({
  selector: 'app-root',
  imports: [ Header, ReactiveEnrollment],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AngularHandsOn');
}
