import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UtilityState } from "@store/utility.reducers";

export const utilitySelector = createFeatureSelector<UtilityState>("utilitydashboard")



export const selectDashboardLogo = createSelector(utilitySelector, (state) => state.dashboardLogo);
export const selectDashboardLogoLoaded = createSelector(selectDashboardLogo, (options) => options !== null);