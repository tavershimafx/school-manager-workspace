import { Student } from "@models/app.models";
import { createReducer, on } from "@ngrx/store";
import { studentProfile } from "@store/actions/student.actions";


export const initialState: Student = {} as Student

export const studentProfileReducer = createReducer(initialState,
    on(studentProfile.setProfile, (state, {profile})=> profile)
)