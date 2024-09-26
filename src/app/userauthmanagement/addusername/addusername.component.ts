import { ApiService } from './../../api.service';
import { Component } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addusername',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './addusername.component.html',
  styleUrl: './addusername.component.css'
})
export class AddusernameComponent {
  usernameForm: FormGroup;

  constructor(private fb: FormBuilder,private router:Router,private apiService:ApiService) {
    // Initialize the form with a username control
    this.usernameForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  // Method to handle username submission
  submitUsername() {
    if (this.usernameForm.valid) {
      const usernameValue = this.usernameForm.get('username')?.value;
     
      console.log('Username submitted:', usernameValue);
this.router.navigate(['/enhance-profile'])
      // Add your API call logic here to save the username
      // this.yourService.saveUsername(usernameValue).subscribe(response => {
      //   // Handle successful response
      // }, error => {
      //   // Handle error response
      // });
      
    } else {
      // Show validation error (optional)
      console.log('Form is invalid');
    }
  }
}
