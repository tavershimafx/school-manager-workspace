import { NgModule } from '@angular/core';
import { DashboardLayoutComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { CommonModule } from '@angular/common';
import { DashboardIndexComponent } from './index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from '@modals/modals.module';
import DirectivesModule from '@directives/directives.module';
import { provideState } from '@ngrx/store';
import { studentProfileReducer } from '@store/reducers/student.reducers';
import { userProfileReducer } from '@store/reducers/user.reducers';
import { dashboardStateReducer } from '@store/reducers/utility.reducers';
import PipesModule from '@pipes/pipes.module';

const components = [
  DashboardLayoutComponent,
  DashboardIndexComponent,
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
    PipesModule
    ],
  exports: [],
  providers: [
    provideState("studentProfile", studentProfileReducer),
    provideState("userProfile", userProfileReducer),
    provideState("dashboard", dashboardStateReducer)
  ],
})
export class DashboardLayoutModule {
  
}
