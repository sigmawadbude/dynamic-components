import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthResponse, commonLoginErrors } from '../Models/auth-response';
import { BehaviorSubject, catchError, delay, Subject, tap, throwError } from 'rxjs';
import { User } from '../Models/user';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  http = inject(HttpClient);
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;
  router = inject(Router);

  signUp(email: string, password: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDzqGhCuAx1Q_41DJy7BJU-hybbb-XrtoM`;
    const data = {
      email,
      password,
      returnSecureToken: true,
    };
    return this.http.post<AuthResponse>(url, data).pipe(
      catchError(this.handleError),
      tap((res) => this.setUser(res))
    );
  }

  signIn(email: string, password: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDzqGhCuAx1Q_41DJy7BJU-hybbb-XrtoM`;
    const data = {
      email,
      password,
      returnSecureToken: true,
    };
    return this.http.post<AuthResponse>(url, data).pipe(
      catchError(this.handleError),
      tap((res) => this.setUser(res))
    );
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if (err.error && err.error.error) {
      const errorResType = err.error.error.message;
      switch (errorResType) {
        case commonLoginErrors.INVALID_LOGIN_CREDENTIALS:
          errorMessage = 'Invalid email or password.';
          break;
        case commonLoginErrors.EMAIL_EXISTS:
          errorMessage =
            'The email address is already in use by another account.';
          break;
        case commonLoginErrors.OPERATION_NOT_ALLOWED:
          errorMessage = 'Password sign-in is disabled for this project.';
          break;
        case commonLoginErrors.TOO_MANY_ATTEMPTS_TRY_LATER:
          errorMessage =
            'We have blocked all requests from this device due to unusual activity. Try again later.';
          break;
        default:
          errorMessage = errorResType; // Return the specific error message
          break;
      }
    } else if (err.status === 500) {
      errorMessage = '500 Server error';
    }
    console.error('Error occurred:', err); // Log the entire error for debugging
    return throwError(() => new Error(errorMessage)); // Return an observable error
  }

  setUser(res: AuthResponse) {
    const expiresInTs = new Date().getTime() + +res.expiresIn * 1000;
    const expiresIn = new Date(expiresInTs);
    const user = new User(res.email, res.localId, res.idToken, expiresIn);
    this.user.next(user);
    this.autoLogOut(+res.expiresIn * 1000)

    localStorage.setItem('user', JSON.stringify(user));

    
  }

  autoLogin(){
    const storedUser = JSON.parse(localStorage.getItem('user')?? 'null');
    if (!storedUser) {
      return;
    }

    const loggedUser = new User(storedUser.email, storedUser.id, storedUser._token, storedUser._expiresIn)

    if (loggedUser.token) {
      this.user.next(loggedUser);
      const expiresInTs = new Date(storedUser._expiresIn).getTime() - new Date().getTime();
      this.autoLogOut(expiresInTs);
    }

  }

  logOut() {
    this.user.next(null);
    localStorage.removeItem('user');
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
    this.router.navigate(['/login']);
  }

  autoLogOut(expireTime: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expireTime);
  }

  isAuthenticated() {
    return this.user.value !== null;
  }
}
