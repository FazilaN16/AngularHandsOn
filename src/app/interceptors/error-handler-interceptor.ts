import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(

    catchError(error => {

      if (error.status === 401) {
        console.error('Unauthorized - Redirect to Login');
      }

      if (error.status === 500) {
        console.error('Internal Server Error');
      }

      return throwError(() => error);

    })

  );

};