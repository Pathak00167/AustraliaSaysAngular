import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ApiService } from '../../api.service';   // Import your ApiService
import { ToastrService } from 'ngx-toastr';  // Assuming Toastr for feedback
import { RegistrationprocessService } from '../../Services/registrationprocess.service';

@Component({
  selector: 'app-registeruser',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatProgressBarModule
  ],
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private apiService: ApiService, // Inject ApiService
    private toastr: ToastrService,
    private registrationService:RegistrationprocessService  // To show success/error messages
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  nextStep() {
    debugger
    if (this.form.valid) {
      const userData = this.form.value;

      this.apiService.registerUser(userData).subscribe(
        (response) => {
          localStorage.setItem('registeredEmail', userData.email);
          this.registrationService.saveStep1Data(userData.email, userData.password);
          this.toastr.success('Please Verify Your Mail!', 'Success');
          this.router.navigate(['/otp-verification']);
        },
        (error) => {
          this.toastr.error('Registration Failed!', 'Error');
          console.error('Registration error', error);
        }
      );
    }
  }
}
