import { Component } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { RegistrationprocessService } from '../../shared/Services/registrationprocess.service'; 

@Component({
  selector: 'app-enhanceprofile',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './enhanceprofile.component.html',
  styleUrl: './enhanceprofile.component.css'
})
export class EnhanceprofileComponent {
  profileForm: FormGroup;
  selectedFile: File | null = null;
  selectedImageUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private apiService: ApiService,
    private registrationService: RegistrationprocessService,
    private toastr: ToastrService
  )  {
    // Initialize the form with name and date of birth controls
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      dob: ['', [Validators.required]]
    });
  }

  // Method to handle file selection
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      // Create image preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImageUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // Method to handle profile submission
  createProfile() {debugger
    if (this.profileForm.valid && this.selectedFile) {debugger
      const userId = this.apiService.getUserIdFromToken();  // Get user ID from token
      const formData = new FormData();
      
      formData.append('UserId', userId);
      formData.append('Name', this.profileForm.get('name')?.value);
      formData.append('Dob', this.profileForm.get('dob')?.value);
      formData.append('UserProfilePicture', this.selectedFile); // Add file to formData

      // Call the API to enhance profile
      this.apiService.EnhanceProfile(formData).subscribe(
        response => {
          console.log('Profile enhanced successfully:', response);
          this.router.navigate(['/user-dashboard']);
          // Handle success actions (e.g., navigation, success message)
        },
        error => {
          this.toastr.error('Something went wrong Please try again')
          console.error('Error enhancing profile:', error);
        }
      );
    } else {
      this.toastr.error('Form is invalid or file not selected')
      console.log('Form is invalid or file not selected');
    }
  }
}
