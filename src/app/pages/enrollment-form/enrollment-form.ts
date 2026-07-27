import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css'
})
export class EnrollmentForm {

  studentName = '';
  studentEmail = '';
  courseId: number | null = null;
  preferredSemester = '';
  agreeToTerms = false;

  // Used to display success message
  submitted = false;


  onSubmit(form: NgForm): void {

    if (form.valid) {

      console.log('Form Value:', form.value);
      console.log('Form Valid:', form.valid);

      this.submitted = true;

    }

  }

}