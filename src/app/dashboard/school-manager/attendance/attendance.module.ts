import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AttendanceRoutingModule } from './attendance.routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from '@modals/modals.module';
import DirectivesModule from '@directives/directives.module';
import PipesModule from '@pipes/pipes.module';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';
import { StaffAttendanceComponent } from './staff-attendance/staff-attendance.component';

const components = [
  StudentAttendanceComponent,
  StaffAttendanceComponent
]

@NgModule({
  declarations: [...components],
  imports: [RouterModule,
    AttendanceRoutingModule, 
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
export class AttendanceModule {
  
}
