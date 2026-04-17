import { Student, UserProfile } from "@models/app.models";
import { createFeatureSelector } from "@ngrx/store";
import { DashboardState } from "@store/reducers/utility.reducers";

export const studentProfileSelector = createFeatureSelector<Student>("studentProfile")

export const userProfileSelector = createFeatureSelector<UserProfile>("userProfile")


export const dashboardSelector = createFeatureSelector<DashboardState>("dashboard")
//export const schoolLogoSelector = createFeatureSelector<string>("schoolLogo")
//export const dashboardLogoSelector = createFeatureSelector<string>("dashboardLogo")