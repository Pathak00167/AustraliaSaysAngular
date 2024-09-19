import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
 
  const mytoken =localStorage.getItem('token');
  const cloneRequest=req.clone({
    setHeaders:{
   Authorization: `Bearer ${mytoken}` 
    }
  })
  return next(cloneRequest);
};
