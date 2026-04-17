import { createActionGroup, props } from "@ngrx/store";


export const dashboardServices = createActionGroup({
    source: "Dashboard",
    events: {
        "Loading": props<{loading: boolean}>(),
        "School Logo": props<{schoolLogo: string}>(),
        "Dashboard Logo": props<{dashboardLogo: string}>()
    }
})