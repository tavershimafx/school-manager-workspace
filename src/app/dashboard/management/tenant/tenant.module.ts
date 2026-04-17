import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TenantRoutingModule } from './tenant.routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from '@modals/modals.module';
import DirectivesModule from '@directives/directives.module';
import PipesModule from '@pipes/pipes.module';
import { AddonComponent } from './addon/addon.component';
import { AssignAddonModal } from './assign-addon/assign-addon.component';
import { DashNavComponent } from './dash-nav/dash-nav.component';
import { NewSubscriptionModal } from './new-subscription/new-subscription.component';
import { NewTenantModal } from './new-tenant/new-tenant.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { TenantsComponent } from './tenants/tenants.component';

const components = [
  AddonComponent,
  AssignAddonModal,
  DashNavComponent,
  NewSubscriptionModal,
  NewTenantModal,
  SubscriptionComponent,
  TenantsComponent
]

@NgModule({
  declarations: [ ...components],
  imports: [RouterModule,
    TenantRoutingModule, 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalsModule,
    DirectivesModule,
    PipesModule
    ],
  exports: [],
  providers: [],
})
export class TenantModule {
  
}
