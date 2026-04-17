import { Student, UserProfile } from "@models/app.models";
import { createActionGroup, emptyProps, props } from "@ngrx/store";


export const userProfile = createActionGroup({
    source: "Account",
    events: {
        "SetProfile": props<{profile: UserProfile}>()
    }
})