import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent {
  userName = 'John Doe';  // Example user data
  userBio = 'This is my bio';
  profilePictureUrl = 'images/avatars/2.jpg'; // Placeholder profile picture URL

  // Function to handle profile picture upload
  onProfilePictureChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePictureUrl = e.target.result;  // Set the new profile picture
      };
      reader.readAsDataURL(file);
    }
  }

  // Save profile changes
  onSaveProfile() {
    // You can implement logic to send the updated data to the server
    console.log('Profile saved:', this.userName, this.userBio);
    alert('Profile updated successfully!');
  }
}
