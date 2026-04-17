import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StaffRoutingModule } from './staff.routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from '@modals/modals.module';
import DirectivesModule from '@directives/directives.module';
import PipesModule from '@pipes/pipes.module';
import { StaffListComponent } from './staff-list/staff-list.component';
import { CreateStaffComponent } from './create-staff/create-staff.component';

const components = [
  StaffListComponent,
  CreateStaffComponent
]

@NgModule({
  declarations: [...components],
  imports: [RouterModule,
    StaffRoutingModule, 
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
export class StaffModule {
  
}
