import { provideState, Store } from "@ngrx/store";
import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { utilityActions } from "@store/utility.actions";

export const UtilityResolver: ResolveFn<Observable<boolean>> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const store = inject(Store);

  store.dispatch(utilityActions.loadDashboardLogo())
  store.dispatch(utilityActions.loadTenantLogo())
  return of(true)
};