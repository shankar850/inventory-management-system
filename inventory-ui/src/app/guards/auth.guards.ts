import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthApi } from '../services/auth-api';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthApi);
  const router = inject(Router);
  return auth.isLoggedIn() ? true : router.createUrlTree(['/login']);
};