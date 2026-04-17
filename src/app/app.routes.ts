import { Routes } from '@angular/router';
import { AdminGuard, StudentResolver } from './security/authenticated';
import { NotFoundComponent } from './no-layout/not-found/not-found.component';

export const routes: Routes = [
    { path: "", loadChildren: () => import("./no-layout/no-layout.module").then(k => k.NoLayoutModule) },
    { path: "dashboard", loadChildren: () => import("./dashboard/dashboard.module").then(k => k.DashboardLayoutModule),
        // canActivate: [AdminGuard],
        // resolve:{
        //     studentProfile: StudentResolver
        // } 
    },
    { path: "**", component: NotFoundComponent },
];
