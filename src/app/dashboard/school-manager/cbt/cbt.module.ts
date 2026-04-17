import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CBTRoutingModule } from './cbt.routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from '@modals/modals.module';
import DirectivesModule from '@directives/directives.module';
import PipesModule from '@pipes/pipes.module';
import { ExamListComponent } from './exam-list/exam-list.component';
import { CreateExamComponent } from './create-exam/create-exam.component';
import { ExamOverviewComponent } from './exam-overview/exam-overview.component';
import { StudentExamDetailsComponent } from './student-examdetails/student-examdetails.component';
import { EncryptionKeysComponent } from './encryption-keys/encryption-keys.component';

const components = [
  ExamListComponent,
  CreateExamComponent,
  ExamOverviewComponent,
  StudentExamDetailsComponent,
  EncryptionKeysComponent
]

@NgModule({
  declarations: [...components],
  imports: [RouterModule,
    CBTRoutingModule, 
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
export class CBTModule {
  
}
