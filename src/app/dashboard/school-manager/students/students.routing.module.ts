import { NgModule } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { StudentSpreadsheetComponent } from './student-spreadsheet/student-spreadsheet.component';

const routes: Routes = [
  { path: "", component: StudentListComponent },
  { path: "new", component: CreateStudentComponent },
  { path: "spreadsheet", component: StudentSpreadsheetComponent },
]

@NgModule({
  imports: [],
  exports: [],
  providers: [provideRouter(routes)]
})
export class StudentsRoutingModule {
  
}
