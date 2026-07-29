import { Routes } from '@angular/router';
import { Home as HomeComponent } from './pages/home/home';
import { CoursesLayout as CoursesLayoutComponent } from './components/courses-layout/courses-layout';
import { CourseList as CourseListComponent } from './pages/course-list/course-list';
import { CourseDetail as CourseDetailComponent } from './pages/course-detail/course-detail';
import { NotFound as NotFoundComponent } from './pages/not-found/not-found';
import { ReactiveEnrollment as ReactiveEnrollmentComponent } from './pages/reactive-enrollment/reactive-enrollment';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'courses', 
    component: CoursesLayoutComponent, 
    children: [
      { path: '', component: CourseListComponent },
      { path: ':id', component: CourseDetailComponent }
    ] 
  },
  { 
    path: 'profile', 
    loadComponent: () => import('./pages/student-profile/student-profile').then(m => m.StudentProfile), 
    canActivate: [authGuard] 
  },
  { path: 'enroll-reactive', component: ReactiveEnrollmentComponent },
  { path: '**', component: NotFoundComponent }
];