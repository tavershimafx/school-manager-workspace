import { NgModule } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { ExamListComponent } from './exam-list/exam-list.component';
import { CreateExamComponent } from './create-exam/create-exam.component';
import { StudentExamDetailsComponent } from './student-examdetails/student-examdetails.component';
import { ExamOverviewComponent } from './exam-overview/exam-overview.component';
import { EncryptionKeysComponent } from './encryption-keys/encryption-keys.component';

const routes: Routes = [
  { path: "", component: ExamListComponent },
  { path: "new", component: CreateExamComponent },
  { path: "exam-overview", component: ExamOverviewComponent },
  { path: "student-exam-details", component: StudentExamDetailsComponent },
  { path: "encryption", component: EncryptionKeysComponent },
]

@NgModule({
  imports: [],
  exports: [],
  providers: [provideRouter(routes)]
})
export class CBTRoutingModule {
  
}
