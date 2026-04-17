import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SchoolStructureRoutingModule } from './school-structure.routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from '@modals/modals.module';
import DirectivesModule from '@directives/directives.module';
import PipesModule from '@pipes/pipes.module';
import { IndexComponent } from './index/index.component';
import { CreateSubjectModal } from './create-subject/create-subject.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { SessionsComponent } from './sessions/sessions.component';
import { ClassesComponent } from './classes/classes.component';
import { NewClassModal } from './new-class/new-class.component';
import { NewSessionModal } from './new-session/new-session.component';

const components = [
  IndexComponent,
  CreateSubjectModal,
  SubjectsComponent,
  SessionsComponent,
  ClassesComponent,
  NewClassModal,
  NewSessionModal
]

@NgModule({
  declarations: [...components],
  imports: [RouterModule,
    SchoolStructureRoutingModule, 
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
export class SchoolStructureModule {
  
}
