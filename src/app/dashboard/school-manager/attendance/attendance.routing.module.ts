import { NgModule } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';
import { StaffAttendanceComponent } from './staff-attendance/staff-attendance.component';

const routes: Routes = [
  { path: "", component: StudentAttendanceComponent },
  { path: "staff", component: StaffAttendanceComponent },
]

@NgModule({
  imports: [],
  exports: [],
  providers: [provideRouter(routes)]
})
export class AttendanceRoutingModule {
  
}
