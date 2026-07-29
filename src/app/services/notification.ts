import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="notification">Notification Component Active</div>`,
  styles: [`
    .notification {
      padding: 10px;
      background-color: #f0f4f8;
      border-left: 4px solid #2b6cb0;
      margin: 10px 0;
    }
  `],
  // Providing NotificationService here creates a brand new, isolated instance 
  // scoped specifically to this component instance and its children.
  providers: []
})
export class NotificationComponent {}