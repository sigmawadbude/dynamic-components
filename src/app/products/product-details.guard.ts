import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export const productDetailsGuard: CanActivateFn = (
  route,
  state
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const router = inject(Router);
  const id = Number(route.paramMap.get('id'));
  if (isNaN(id) || id < 1) {
    alert('Invalid product id');
    router.navigate(['/products']);
    return false;
  }
  return true;
};
