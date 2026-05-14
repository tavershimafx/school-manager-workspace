import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import AuthorizeService from './auth.service';
import { catchError, map, of } from 'rxjs';

export const AdminGuard: CanActivateFn = (route, state) => {
const authService = inject(AuthorizeService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(map(x => {
    if(x) return true; 
        return router.createUrlTree(['/']);
    }
  ), catchError(() => of(router.createUrlTree(['/']))))
};

