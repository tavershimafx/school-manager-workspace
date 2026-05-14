import { provideEffects } from "@ngrx/effects";
import { provideState, Store } from "@ngrx/store";
import { dashboardStateReducer } from "../store/dashboard.reducers";
import { DashboardEffects } from "../store/dashboard.effects";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Observable, of } from "rxjs";

export const accountProviders = [
  provideState('dashboard', dashboardStateReducer),
  provideEffects(DashboardEffects)
];


export const AccountResolver: ResolveFn<Observable<any>> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const store = inject(Store);


  return of(true)
};