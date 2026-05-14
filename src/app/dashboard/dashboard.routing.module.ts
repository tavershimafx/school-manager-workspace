import { NgModule } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard.component';
import { DashboardIndexComponent } from './index/index.component';
import { DefaultComponent } from './default/default.component';

const routes: Routes = [
  { path: "", component: DashboardLayoutComponent, children:[
  { path: "", component: DefaultComponent},
  { path: "index", component: DashboardIndexComponent},
  { path: "mgmt", loadChildren: () => import("./management/management.module").then(p => p.ManagementModule)},
  { path: "scm", loadChildren: () => import("./school-manager/school-manager.module").then(p => p.SchoolManagerModule)},
  { path: "account", loadChildren: () => import("./account/account.module").then(p => p.AccountModule)}
  ]},
]

@NgModule({
  imports: [],
  exports: [],
  providers: [provideRouter(routes)]
})
export class DashboardRoutingModule {
  
}
