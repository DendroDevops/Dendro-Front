import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authservice: AuthService, private route: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.authservice.logOut();
        this.route.navigate(['/login'])
      }
      if (err.status === 404) {
        this.route.navigate(['/error-404'])
      }

      if (err.status === 500) {
        this.route.navigate(['/error-500'])
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}
