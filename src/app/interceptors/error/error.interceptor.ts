import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 400) {
        // Unauthorized
        console.error('errorInterceptor Bad Request - 400');
      } else if (error.status === 401) {
        // Unauthorized
        console.error('errorInterceptor Unauthorized access - 401');
      } else if (error.status === 403) {
        // Forbidden
        console.error('errorInterceptor Access denied - 403');
      } else if (error.status === 404) {
        // Not Found
        console.error('errorInterceptor Resource not found - 404');
      } else if (error.status === 500) {
        // Internal Server 
        console.error('errorInterceptor Internal Server Error - 500');
      } else {
        // unexpected Errors
        console.error('errorInterceptor An unexpected error occurred', error);
      }
      const err: any = error.message || error.statusText;
      return throwError(() => new Error(err || 'Server Error'));
    })
  );
};
