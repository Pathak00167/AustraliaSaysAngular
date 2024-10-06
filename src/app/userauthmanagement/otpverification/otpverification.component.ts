import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { RegistrationprocessService } from '../../Services/registrationprocess.service'; 

@Component({
  selector: 'app-otpverification',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './otpverification.component.html',
  styleUrls: ['./otpverification.component.css']
})
export class OtpverificationComponent {
  otpForm: FormGroup;
  email: string | null = ''; // Store email here

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private apiService: ApiService,
    private registrationService: RegistrationprocessService,
    private toastr: ToastrService
  ) {
    // Retrieve the email from localStorage
    this.email = localStorage.getItem('registeredEmail');

    // Initialize the form with form controls
    this.otpForm = this.fb.group({
      email: [this.email, [Validators.required, Validators.email]], 
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  // Method to handle OTP submission
  submitOtp() {
    debugger
    if (this.otpForm.valid) {
      const otpValue = this.otpForm.value.otp;
      const emailValue = this.otpForm.value.email;

      // Call API to verify the OTP
      this.apiService.VerifyOtp({ email: emailValue, otp: otpValue }).subscribe(
        (response) => {
          this.registrationService.verifyOtp(otpValue);
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          this.router.navigate(['/add-username']);
          this.toastr.success('OTP Verified Successfully!', 'Success');
        },
        (error) => {
          // Handle the error response
          this.toastr.error('OTP Verification Failed!', 'Error');
          console.error('OTP verification error:', error);
        }
      );

      console.log('OTP submitted:', otpValue);
      console.log('Email submitted:', emailValue);

    } else {
      console.log('Form is invalid');
      this.toastr.warning('Please provide a valid OTP.', 'Warning');
    }
  }
}
