import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';  

export const adminGuard: CanActivateFn = (route, state) => {
  const role = localStorage.getItem('role');
  
  
  if (role === 'Admin') {
    return true;  
  } else {
    const router = inject(Router);  
    router.navigate(['/unauthorized']); 
    return false;  
  }
};
