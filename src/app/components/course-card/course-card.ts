import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {

  @Input() course!: {
    id: number;
    name: string;
    code: string;
    credits: number;
    gradeStatus: string;
  };

  @Output() enrollRequested = new EventEmitter<number>();

  isEnrolled = false;
  isExpanded = false;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Course changed:', changes['course']);
  }

  // Getter keeps the template clean by moving the class logic into the component.
  get cardClasses() {
    return {
      'card--enrolled': this.isEnrolled,
      'card--full': this.course.credits >= 4,
      'expanded': this.isExpanded
    };
  }
}