import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  const role = localStorage.getItem('role');
  
  if (role === 'User') {
    return true;  
  } else {
    const router = inject(Router);  
    router.navigate(['/unauthorized']);  
    return false; 
  }
};
