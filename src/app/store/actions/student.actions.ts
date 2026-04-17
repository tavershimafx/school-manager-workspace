import { Student } from "@models/app.models";
import { createActionGroup, emptyProps, props } from "@ngrx/store";


export const studentProfile = createActionGroup({
    source: "Dashboard",
    events: {
        "Set Profile": props<{profile: Student}>()
    }
})