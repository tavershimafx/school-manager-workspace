import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdministrationRoutingModule } from './administration.routing.module';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from '@modals/modals.module';
import DirectivesModule from '@directives/directives.module';
import PipesModule from '@pipes/pipes.module';
import { NewUserComponent } from './new-user/new-user.component';
import { RolesComponent } from './roles/roles.component';
import { NewRoleComponent } from './new-role/new-role.component';
import { AuditLogsComponent } from './audit-logs/audit-logs.component';

const components = [
  UsersComponent,
  NewUserComponent,
  RolesComponent,
  NewRoleComponent,
  AuditLogsComponent
]

@NgModule({
  declarations: [ ...components],
  imports: [RouterModule,
    AdministrationRoutingModule, 
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
export class AdministrationModule {
  
}
