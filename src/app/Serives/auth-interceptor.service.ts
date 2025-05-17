import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType, HttpParams, HttpEvent } from '@angular/common/http';
import { catchError, exhaustMap, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { EMPTY, Observable, of, throwError } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
  private readonly authService = inject(AuthService);
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        if (user.token) {
          const modifiedReq = req.clone({
            params: new HttpParams().set('auth', user.token),
          });
          return next.handle(modifiedReq);
        } else {
          // Handle the case where user is not null but does not have a token property
          console.error('User  does not have a token property');
          return throwError(() => new Error('User  does not have a token property'));
        }
      }),
      catchError((error) => {
        // Handle any errors that occur during the authentication process
        console.error('Error occurred during authentication:', error);
        return throwError(() => error);
      })
    );
  }
}