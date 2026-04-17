import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManagementRoutingModule } from './management.routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from '@modals/modals.module';
import DirectivesModule from '@directives/directives.module';
import PipesModule from '@pipes/pipes.module';


@NgModule({
  imports: [RouterModule,
    ManagementRoutingModule, 
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
export class ManagementModule {
  
}
