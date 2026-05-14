
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DashboardState } from "./dashboard.reducers";


export const dashboardSelector = createFeatureSelector<DashboardState>("userdashboard")


export const selectTenantLogo = createSelector(dashboardSelector, (state) => state.tenantLogo);
export const selectTenantLogoLoaded = createSelector(selectTenantLogo, (logo) => logo !== null);

export const selectDashboardLogo = createSelector(dashboardSelector, (state) => state.dashboardLogo);
export const selectDashboardLogoLoaded = createSelector(selectDashboardLogo, (logo) => logo !== null);

export const selectEntityStatuses = createSelector(dashboardSelector, (state) => state.entityStatus);
export const selectEntityStatusLoaded = createSelector(selectEntityStatuses, (options) => options !== null);

export const selectUserProfile = createSelector(dashboardSelector, (state) => state.user);
export const selectUserProfileLoaded = createSelector(selectUserProfile, (user) => user !== null);