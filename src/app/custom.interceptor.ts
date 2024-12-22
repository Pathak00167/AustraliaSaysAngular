import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core'; // For dependency injection in functional interceptors
import { LoaderService } from './shared/loader.service'; // Adjust the path as needed
import { finalize } from 'rxjs/operators';

export const customInterceptor: HttpInterceptorFn = (req, next) => {debugger

  const loaderService = inject(LoaderService);
  
  loaderService.show();

 
  const mytoken =localStorage.getItem('token');
  const cloneRequest=req.clone({
    setHeaders:{
   Authorization: `Bearer ${mytoken}` 
    }
  })
 return next(cloneRequest).pipe(
    finalize(() => loaderService.hide()) 
  );
};
