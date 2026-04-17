import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SchoolManagerRoutingModule } from './school-manager.routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from '@modals/modals.module';
import DirectivesModule from '@directives/directives.module';
import PipesModule from '@pipes/pipes.module';
import { ClassSubjectComponent } from './class-subject/class-subject.component';

@NgModule({
  declarations: [ClassSubjectComponent],
  imports: [RouterModule,
    SchoolManagerRoutingModule, 
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
export class SchoolManagerModule {
  
}
