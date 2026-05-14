import { createReducer, on } from "@ngrx/store";
import { IKeyValue, UserProfile } from "@models/app.models";
import { DashboardActions } from "./dashboard.actions";

export class DashboardState {
    tenantLogo: string | null = null
    dashboardLogo: string | null = null
    isLoading: boolean = false;
    user: UserProfile | null = null
    entityStatus: IKeyValue[] | null = null
}

export const dashboardState: DashboardState = new DashboardState()

export const dashboardStateReducer = createReducer(dashboardState,
    on(DashboardActions.tenantLogoLoaded, (state, {logo})=> ({
        ...state,
        tenantLogo: logo
    })),
    on(DashboardActions.dashboardLogoLoaded, (state, {logo})=> ({
        ...state,
        dashboardLogo: logo
    })),
    on(DashboardActions.loading, (state, {loading})=> ({
        ...state,
        isLoading: loading
    })),
    on(DashboardActions.userLoaded, (state, {profile})=> ({
        ...state,
        user: profile
    })),
    on(DashboardActions.entityStatusLoaded, (state, {options})=> ({
        ...state,
        entityStatus: options
    })),
)
