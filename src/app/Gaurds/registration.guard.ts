import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RegistrationprocessService } from '../Services/registrationprocess.service'; 

@Injectable({
  providedIn: 'root'
})
export class RegistrationGuard implements CanActivate {
  constructor(private registrationService: RegistrationprocessService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const stepRequired = route.data['stepRequired']; // Get required step from route data
    const currentStepCompleted = this.registrationService.getRegistrationData();

    if (currentStepCompleted >= stepRequired) {
      return true; // Allow navigation if the required step is completed
    } else {
      // Redirect based on which step the user should be on
      switch (currentStepCompleted) {
        case 0:
          this.router.navigate(['/register-step-1']);
          break;
        case 1:
          this.router.navigate(['/otp-verification']);
          break;
        case 2:
          this.router.navigate(['/add-username']);
          break;
        default:
          this.router.navigate(['/login']);
      }
      return false;
    }
  }
}
