import { NgModule } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { StaffListComponent } from './staff-list/staff-list.component';
import { CreateStaffComponent } from './create-staff/create-staff.component';

const routes: Routes = [
  { path: "", component: StaffListComponent },
  { path: "new", component: CreateStaffComponent },
]

@NgModule({
  imports: [],
  exports: [],
  providers: [provideRouter(routes)]
})
export class StaffRoutingModule {
  
}
