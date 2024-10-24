import { Injectable } from '@angular/core';

// Define an interface for registration data
interface RegistrationData {
  email?: string;
  password?: string;
  username?: string;
  profileDetails?: {
    bio?: string;
    profilePicUrl?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationprocessService {
  private registrationData: RegistrationData = {}; // Temporary storage for registration data
  private currentStep: number = 0; // To track the current step

  constructor() { }

  // Store email and password (step 1)
  saveStep1Data(email: string, password: string) {
    this.registrationData.email = email;
    this.registrationData.password = password;
    this.incrementStep(); // Move to the next step
  }

  // Verify OTP (step 2)
  verifyOtp(otp: string) {
    
      this.incrementStep(); // Move to the next step if OTP is valid
   
  }

  // Save username (step 3)
  saveUsername(username: string) {
    debugger
    
    this.incrementStep(); 
  }

  // Save profile details (step 4)
  saveProfileDetails(profileDetails: { bio?: string, profilePicUrl?: string }) {
    this.registrationData.profileDetails = profileDetails;
    this.completeRegistration(); // Finalize the registration
  }

  // Submit all data after final step
  completeRegistration() {
    // Call an API to submit registrationData
    console.log('Registration complete:', this.registrationData);
    // Reset data if needed
    this.resetRegistrationData();
  }

  // Increment the current registration step
  private incrementStep() {
    this.currentStep += 1;
  }

  // Reset registration data
  private resetRegistrationData() {
    this.registrationData = {};
    this.currentStep = 0;
  }

  // Get current registration data
  getRegistrationData() {
    return this.registrationData;
  }

  // Get the current registration step
  getCurrentStep(): number {
    return this.currentStep;
  }
}
