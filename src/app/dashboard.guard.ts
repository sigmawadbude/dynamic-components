import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './Serives/auth.service';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';

export const dashboardGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  return authService.user.pipe(
    map(user => {
      const isUser = user !== null && user !== undefined;

      if (isUser ) {
        return true; // Allow access
      } else {
        return router.createUrlTree(['/login']); // Redirect to login
      }
    })
  )
};
