import { CanActivateFn, CanActivateChildFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import AuthorizeService from './auth.service';
import { catchError, map, of } from 'rxjs';
import { Student, StudentProfile } from '@models/app.models';
import { Store } from '@ngrx/store';
import { studentProfile } from '@store/actions/student.actions';

export const AdminGuard: CanActivateFn = (route, state) => {
const authService = inject(AuthorizeService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(map(x => {
    if(x) return true; 
        return router.createUrlTree(['/']);
    }
  ), catchError(() => of(router.createUrlTree(['/']))))
};

export const StudentResolver: ResolveFn<Student> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthorizeService);
  return authService.getProfile();
};
