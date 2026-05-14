import { NgModule } from '@angular/core';
import { DashboardLayoutComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { CommonModule } from '@angular/common';
import { DashboardIndexComponent } from './index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from '@modals/modals.module';
import DirectivesModule from '@directives/directives.module';
import PipesModule from '@pipes/pipes.module';
import { ComponentsModule } from '@components/components.module';
import { DefaultComponent } from './default/default.component';

const components = [
  DashboardLayoutComponent,
  DashboardIndexComponent,
  DefaultComponent
]

@NgModule({
  declarations: [ ...components],
  imports: [RouterModule,
    DashboardRoutingModule, 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalsModule,
    DirectivesModule,
    PipesModule,
    ComponentsModule
    ],
  exports: [],
  providers: [ ],
})
export class DashboardLayoutModule {
  
}
