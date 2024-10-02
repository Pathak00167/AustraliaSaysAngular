import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationprocessService {
  private registrationData: any = {}; // Temporary storage for registration data
  
  constructor() { }

  // Store email and password (step 1)
  saveStep1Data(email: string, password: string) {
    this.registrationData.email = email;
    this.registrationData.password = password;
  }

  // Verify OTP (step 2)
  verifyOtp(otp: string): boolean {
    // Implement OTP verification logic (you can call an API)
    return otp === '1234'; // Mock verification for now
  }

  // Save username (step 3)
  saveUsername(username: string) {
    this.registrationData.username = username;
  }

  // Save profile details (step 4)
  saveProfileDetails(profileDetails: { bio?: string, profilePicUrl?: string }) {
    this.registrationData.profileDetails = profileDetails;
  }

  // Submit all data after final step
  completeRegistration() {
    // Call an API to submit registrationData
    console.log('Registration complete:', this.registrationData);
  }

  // Get current registration data
  getRegistrationData() {
    return this.registrationData;
  }
}