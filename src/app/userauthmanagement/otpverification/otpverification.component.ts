import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-otpverification',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './otpverification.component.html',
  styleUrls: ['./otpverification.component.css'] // Correct 'styleUrl' to 'styleUrls'
})
export class OtpverificationComponent {
  otpForm: FormGroup;
  email: string | null = ''; // Store email here

  constructor(private fb: FormBuilder, private router: Router,private apiService: ApiService,private toastr:ToastrService) {
    // Retrieve the email from localStorage
    this.email = localStorage.getItem('registeredEmail');

    // Initialize the form with form controls
    this.otpForm = this.fb.group({
      email: [this.email, [Validators.required, Validators.email]], // Assign the email retrieved from localStorage
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  // Method to handle OTP submission
  submitOtp() {
    if (this.otpForm.valid) {
      debugger
      const otpValue = this.otpForm.value;
      const emailValue = this.otpForm.get('email')?.value;
      this.apiService.VerifyOtp(otpValue).subscribe(
        (response) => {
          this.toastr.success('Registration Successful!', 'Success');
          this.router.navigate(['/add-username']);
        },
        (error) => {
          this.toastr.error('Registration Failed!', 'Error');
          console.error('Registration error', error);
        }
      );

      console.log('OTP submitted:', otpValue);
      console.log('Email submitted:', emailValue);

    
      this.router.navigate(['/add-username']);

      
    } else {
      console.log('Form is invalid');
    }
  }
}
