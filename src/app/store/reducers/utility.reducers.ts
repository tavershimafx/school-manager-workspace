import { createReducer, on } from "@ngrx/store";
import { dashboardServices } from "@store/actions/utility.actions";

export class DashboardState {
    isLoading: boolean = false;
    schoolLogo: string = ""
    dashboardLogo: string = ""
}

export const initialState: DashboardState = new DashboardState()

export const dashboardStateReducer = createReducer(initialState,
    on(dashboardServices.loading, (state, {loading})=> ({
        ...state,
        isLoading: loading
    })),
    on(dashboardServices.schoolLogo, (state, {schoolLogo})=> ({
        ...state,
        schoolLogo: schoolLogo
    })),
    on(dashboardServices.dashboardLogo, (state, {dashboardLogo})=> ({
        ...state,
        dashboardLogo: dashboardLogo
    }))
)