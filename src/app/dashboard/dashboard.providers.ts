import { provideState, Store } from "@ngrx/store";
import { dashboardStateReducer } from "./store/dashboard.reducers";
import { provideEffects } from "@ngrx/effects";
import { DashboardEffects } from "./store/dashboard.effects";
import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { forkJoin, map, Observable, of } from "rxjs";
import { DashboardActions } from "./store/dashboard.actions";
import { DashboardServices } from "./dashboard.services";
import AuthorizeService from "../security/auth.service";

export const dashboardProviders = [
  provideState("userdashboard", dashboardStateReducer),
  provideEffects(DashboardEffects)
];

export const DashboardResolver: ResolveFn<Observable<any>> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const store = inject(Store);
  const dashb = inject(DashboardServices);
  const auth = inject(AuthorizeService);

  store.dispatch(DashboardActions.loadUser());
  store.dispatch(DashboardActions.loadDashboardLogo())
  store.dispatch(DashboardActions.loadTenantLogo())
  store.dispatch(DashboardActions.loadEntityStatus())

  // let required = [
  //   dashb.getDashboardLogo().pipe((map(z => { store.dispatch(DashboardActions.dashboardLogoLoaded({logo: z })) }))), 
  //   dashb.getTenantLogo().pipe((map(z => { store.dispatch(DashboardActions.tenantLogoLoaded({logo: z })) }))), 
  //   auth.getAccount().pipe((map(z => { store.dispatch(DashboardActions.userLoaded({profile: z })) }))), 
  // ]

  //return forkJoin(required)
  return of(true)
};

