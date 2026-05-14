import { Routes } from '@angular/router';
import { AdminGuard } from './security/authenticated';
import { NotFoundComponent } from './no-layout/not-found/not-found.component';
import { dashboardProviders, DashboardResolver } from './dashboard/dashboard.providers';
import { provideState } from '@ngrx/store';
import { UtilityResolver } from '@store/utility.providers';
import { utilityStateReducer } from '@store/utility.reducers';

export const routes: Routes = [
    { path: "", loadChildren: () => import("./no-layout/no-layout.module").then(k => k.NoLayoutModule),
        providers: [provideState("utilitydashboard", utilityStateReducer)],
        resolve:{
            userProfile: UtilityResolver
        } 
    },
    { path: "dashboard", loadChildren: () => import("./dashboard/dashboard.module").then(k => k.DashboardLayoutModule),
        providers: dashboardProviders,
        canActivate: [AdminGuard],
        resolve:{
            dropdowns: DashboardResolver
        } 
    },
    { path: "**", component: NotFoundComponent },
];
