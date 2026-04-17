import { UserProfile } from "@models/app.models";
import { createReducer, on } from "@ngrx/store";
import { userProfile } from "@store/actions/user.actions";


export const initialState: UserProfile = {} as UserProfile

export const userProfileReducer = createReducer(initialState,
    on(userProfile.setProfile, (state, {profile})=> profile)
)