import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountRoutingModule } from './account.routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from '@modals/modals.module';
import DirectivesModule from '@directives/directives.module';
import PipesModule from '@pipes/pipes.module';
import { AccountOverviewComponent } from './overview/overview.component';
import { ChangeLogComponent } from './change-log/change-log.component';

const components = [
  AccountOverviewComponent,
  ChangeLogComponent
]
@NgModule({
  declarations: [ ...components],
  imports: [RouterModule,
    AccountRoutingModule, 
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
export class AccountModule {
  
}
