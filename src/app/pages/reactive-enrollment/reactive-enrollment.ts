import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course';

function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (value && value.toString().startsWith('XX')) {
    return { noCourseCode: true };
  }

  return null;
}

function simulateEmailCheck(): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> => {

    return new Promise(resolve => {

      setTimeout(() => {

        if (control.value && control.value.includes('test@')) {
          resolve({ emailTaken: true });
        } else {
          resolve(null);
        }

      }, 800);

    });

  };
}

@Component({
  selector: 'app-reactive-enrollment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment.html',
  styleUrl: './reactive-enrollment.css'
})
export class ReactiveEnrollment implements OnInit {

  enrollForm!: FormGroup;

 constructor(
  private fb: FormBuilder,
  private courseService: CourseService
) {}

  ngOnInit(): void {

    this.enrollForm = this.fb.group({

      studentName: ['', [Validators.required, Validators.minLength(3)]],

      studentEmail: this.fb.control(
        '',
        [Validators.required, Validators.email],
        [simulateEmailCheck()]
      ),

      courseId: ['', [Validators.required, noCourseCode]],

      preferredSemester: ['Odd', Validators.required],

      agreeToTerms: [false, Validators.requiredTrue],

      additionalCourses: this.fb.array([])

    });

  }

  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addCourse(): void {
    this.additionalCourses.push(
      new FormControl('', Validators.required)
    );
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

 onSubmit(): void {

  if (this.enrollForm.invalid) {
    return;
  }

  this.courseService.createCourse(this.enrollForm.value).subscribe({
    next: (response) => {
      console.log('Course created successfully!', response);
    },
    error: (err) => {
      console.error('Error creating course:', err);
    }
  });

}

}