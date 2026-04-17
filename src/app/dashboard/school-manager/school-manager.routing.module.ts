import { NgModule } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { ClassSubjectComponent } from './class-subject/class-subject.component';

const routes: Routes = [
  { path: "structure", loadChildren: () => import("./school-structure/school-structure.module").then(k => k.SchoolStructureModule) },
  { path: "sections", loadChildren: () => import("./class-sections/class-sections.module").then(k => k.ClassSectionsModule) },
  { path: "class-subject", component: ClassSubjectComponent },
  { path: "students", loadChildren: () => import("./students/students.module").then(k => k.StudentsModule) },
  { path: "attendance", loadChildren: () => import("./attendance/attendance.module").then(k => k.AttendanceModule) },
  { path: "staff", loadChildren: () => import("./staff/staff.module").then(k => k.StaffModule) },
  { path: "academics", loadChildren: () => import("./academics/academics.module").then(k => k.AcademicsModule) },
  { path: "finance", loadChildren: () => import("./finance/finance.module").then(k => k.FinanceModule) },
  { path: "cbt", loadChildren: () => import("./cbt/cbt.module").then(k => k.CBTModule) },
  { path: "admin", loadChildren: () => import("./admin/admin.module").then(k => k.AdminModule) },
]

@NgModule({
  imports: [],
  exports: [],
  providers: [provideRouter(routes)]
})
export class SchoolManagerRoutingModule {
  
}
