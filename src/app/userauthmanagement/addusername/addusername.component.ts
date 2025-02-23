import { ApiService } from './../../api.service';
import { Component } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationprocessService } from '../../shared/Services/registrationprocess.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addusername',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './addusername.component.html',
  styleUrl: './addusername.component.css'
})
export class AddusernameComponent {
  usernameForm: FormGroup;

  constructor(private fb: FormBuilder,private router:Router,private apiService:ApiService,private registrationService: RegistrationprocessService,
    private toastr: ToastrService) {
    // Initialize the form with a username control
    this.usernameForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

 
  submitUsername() {
    if (this.usernameForm.valid) {debugger
      const usernameValue = this.usernameForm.get('username')?.value;
      const userId = this.apiService.getUserIdFromToken(); 
  
      // formdata
      const formData = new FormData();
      formData.append('UserId', userId);
      formData.append('UserName', usernameValue);
  
      this.apiService.UserUniqueName(formData).subscribe(
        response => {
          console.log('Username submitted successfully:', response);
          this.registrationService.saveUsername(usernameValue);
          this.router.navigate(['/enhance-profile']); 
          this.toastr.success('UserName Added Successfully!', 'Success');
        },
        error => {
          console.error('Error submitting username:', error);
        }
      );
  
      console.log('Username submitted:', usernameValue);
    } else {
      console.log('Form is invalid');
    }
  }
  
}
