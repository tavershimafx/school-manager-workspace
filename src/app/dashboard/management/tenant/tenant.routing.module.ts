import { NgModule } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { TenantsComponent } from './tenants/tenants.component';
import { AddonComponent } from './addon/addon.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { DashNavComponent } from './dash-nav/dash-nav.component';

const routes: Routes = [
    { path: "", component: TenantsComponent },
    { path: "tenants", component: TenantsComponent },
    { path: "dash-nav", component: DashNavComponent },
    { path: "subscriptions", component: SubscriptionComponent },
    { path: "addons", component: AddonComponent },
]

@NgModule({
  imports: [],
  exports: [],
  providers: [provideRouter(routes)]
})
export class TenantRoutingModule {
  
}
