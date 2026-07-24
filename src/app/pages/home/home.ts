import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {

  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';
  courseCount = 0;

  onEnrollClick() {
    this.message = 'Enrollment opened!';
  }

  ngOnInit(): void {
    this.courseCount = 12;
    console.log('HomeComponent initialised — courses loaded');
  }

  ngOnDestroy(): void {
  console.log('HomeComponent destroyed');
}
}

// [property] is one-way binding (Component → DOM)
// [(ngModel)] is two-way binding (Component ↔ DOM)