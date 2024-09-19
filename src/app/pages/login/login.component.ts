import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from './../../api.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private ApiService: ApiService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    debugger
    this.errorMessage = null;  // Reset the error message before a new login attempt
    if (this.loginForm.valid) {
      this.ApiService.login(this.loginForm.value).subscribe(response => {
        if (response.role === 'Admin') {
          console.log(response.token)
          alert("login successfully")
          // Save the token and navigate to the admin page
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          this.router.navigate(['dashboard']);
        } else {
          this.errorMessage = 'Access denied. Only admin can log in.';
        }
      }, error => {
        this.errorMessage = 'Login failed. Please check your credentials and try again.';
      });
    }
  }
}
