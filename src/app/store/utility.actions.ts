import { createActionGroup, emptyProps, props } from "@ngrx/store";


export const utilityActions = createActionGroup({
    source: "Utility",
    events: {
        "Load Tenant Logo": emptyProps(),
        "Tenant Logo Loaded": props<{logo: string}>(),

        "Load Dashboard Logo": emptyProps(),
        "Dashboard Logo Loaded": props<{logo: string}>(),
    }
})