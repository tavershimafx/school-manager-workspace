import { NgModule } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { AssessmentsComponent } from './assessments/assessments.component';
import { ResultClassesComponent } from './result-classes/result-classes.component';
import { ResultSessionsComponent } from './result-sessions/result-sessions.component';
import { ResultTermsComponent } from './result-terms/result-terms.component';
import { GradingComponent } from './grading/grading.component';
import { GroupActionsComponent } from './group-actions/group-actions.component';
import { GroupActionsNewComponent } from './group-actions-new/group-actions-new.component';

const routes: Routes = [
  { path: "", component: AssessmentsComponent },
  { path: "assessments", component: AssessmentsComponent },
  { path: "grading", component: GradingComponent },
  { path: "result-classes", component: ResultClassesComponent },
  { path: "result-sessions", component: ResultSessionsComponent },
  { path: "result-terms", component: ResultTermsComponent },
  { path: "group-actions", component: GroupActionsComponent },
  { path: "group-actions-new", component: GroupActionsNewComponent },
]

@NgModule({
  imports: [],
  exports: [],
  providers: [provideRouter(routes)]
})
export class AcademicsRoutingModule {
  
}
