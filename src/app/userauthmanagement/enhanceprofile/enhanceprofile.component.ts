import { Component } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enhanceprofile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enhanceprofile.component.html',
  styleUrl: './enhanceprofile.component.css'
})
export class EnhanceprofileComponent {
  profileForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    // Initialize the form with name and date of birth controls
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      dob: ['', [Validators.required]]
    });
  }

  // Method to handle file selection
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = input.files[0];
      // You can add logic to preview the image if needed
    }
  }

  // Method to handle profile submission
  createProfile() {
    if (this.profileForm.valid) {
      const profileData = {
        name: this.profileForm.get('name')?.value,
        dob: this.profileForm.get('dob')?.value,
        profilePic: this.selectedFile // Include the selected file
      };
      console.log('Profile Data:', profileData);

      // Add your API call logic here to save the profile data
      // this.yourService.saveProfile(profileData).subscribe(response => {
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
