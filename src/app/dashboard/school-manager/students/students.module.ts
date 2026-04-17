import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentsRoutingModule } from './students.routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from '@modals/modals.module';
import DirectivesModule from '@directives/directives.module';
import PipesModule from '@pipes/pipes.module';
import { StudentListComponent } from './student-list/student-list.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { StudentSpreadsheetComponent } from './student-spreadsheet/student-spreadsheet.component';
import { GenerateEnrollmentModal } from './generate-enrollment/generate-enrollment.component';
import { ResetPasswordsModal } from './reset-passwords/reset-passwords.component';
import { ClearEnrollmentModal } from './clear-enrollment/clear-enrollment.component';
import { SpoolFiltersModal } from './spool-filters/spool-filters.component';

const components = [
  StudentListComponent,
  CreateStudentComponent,
  StudentSpreadsheetComponent,
  GenerateEnrollmentModal,
  ResetPasswordsModal,
  ClearEnrollmentModal,
  SpoolFiltersModal
]

@NgModule({
  declarations: [...components],
  imports: [RouterModule,
    StudentsRoutingModule, 
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
export class StudentsModule {
  
}
