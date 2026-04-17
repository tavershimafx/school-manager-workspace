import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AcademicsRoutingModule } from './academics.routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from '@modals/modals.module';
import DirectivesModule from '@directives/directives.module';
import PipesModule from '@pipes/pipes.module';
import { AssessmentsComponent } from './assessments/assessments.component';
import { GradingComponent } from './grading/grading.component';
import { ResultClassesComponent } from './result-classes/result-classes.component';
import { ResultSessionsComponent } from './result-sessions/result-sessions.component';
import { ResultTermsComponent } from './result-terms/result-terms.component';
import { MoveAssessmentModal } from './move-assessment/move-assessment.component';
import { UploadAssessmentModal } from './upload-assessment/upload-assessment.component';
import { DeleteAssessmentModal } from './delete-assessment/delete-assessment.component';

const components = [
  AssessmentsComponent,
  GradingComponent,
  ResultClassesComponent,
  ResultSessionsComponent,
  ResultTermsComponent,
  MoveAssessmentModal,
  UploadAssessmentModal,
  DeleteAssessmentModal
]

@NgModule({
  declarations: [...components],
  imports: [RouterModule,
    AcademicsRoutingModule, 
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
export class AcademicsModule {
  
}
