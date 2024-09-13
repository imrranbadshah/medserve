import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Unauthorized
        console.error('Unauthorized access - 401');
      } else if (error.status === 403) {
        // Forbidden
        console.error('Access denied - 403');
      } else if (error.status === 404) {
        // Not Found
        console.error('Resource not found - 404');
      } else if (error.status === 500) {
        // Internal Server 
        console.error('Internal Server Error - 500');
      } else {
        // unexpected Errors
        console.error('An unexpected error occurred', error);
      }
      return throwError(() => new Error(error.message || 'Server Error'));
    })
  );
};
