import { createReducer, on } from "@ngrx/store";
import { utilityActions } from "@store/utility.actions";

export class UtilityState {
    tenantLogo: string | null = null
    dashboardLogo: string | null = null
}

export const utilityState: UtilityState = new UtilityState()

export const utilityStateReducer = createReducer(utilityState,
    on(utilityActions.tenantLogoLoaded, (state, {logo})=> ({
        ...state,
        tenantLogo: logo
    })),
    on(utilityActions.dashboardLogoLoaded, (state, {logo})=> ({
        ...state,
        dashboardLogo: logo
    })),
)