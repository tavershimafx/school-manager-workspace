import { IKeyValue, UserProfile } from "@models/app.models";
import { createActionGroup, emptyProps, props } from "@ngrx/store";


export const DashboardActions = createActionGroup({
    source: "Dashboard",
    events: {
        "Load Tenant Logo": emptyProps(),
        "Tenant Logo Loaded": props<{logo: string}>(),

        "Load Dashboard Logo": emptyProps(),
        "Dashboard Logo Loaded": props<{logo: string}>(),
        
        "Loading": props<{loading: boolean}>(),
        
        "Load User": emptyProps(),
        "User Loaded": props<{profile: UserProfile}>(),

        "Load Entity Status": emptyProps,
        "Entity Status Loaded": props<{options: IKeyValue[]}>(),
    }
})
