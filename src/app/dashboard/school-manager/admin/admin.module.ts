import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin.routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from '@modals/modals.module';
import DirectivesModule from '@directives/directives.module';
import PipesModule from '@pipes/pipes.module';
import { UsersComponent } from './users/users.component';
import { NewUserComponent } from './new-user/new-user.component';
import { RolesComponent } from './roles/roles.component';
import { NewRoleComponent } from './new-role/new-role.component';
import { SchoolSettingsComponent } from './school-settings/school-settings.component';
import { StaffCodesComponent } from './staff-codes/staff-codes.component';
import { SettingGroupsComponent } from './setting-groups/setting-groups.component';
import { AuditLogsComponent } from './audit-logs/audit-logs.component';
import { ApiKeysComponent } from './api-keys/api-keys.component';

const components = [
  UsersComponent,
  NewUserComponent,
  RolesComponent,
  NewRoleComponent,
  SchoolSettingsComponent,
  StaffCodesComponent,
  SettingGroupsComponent,
  AuditLogsComponent,
  ApiKeysComponent
]

@NgModule({
  declarations: [...components],
  imports: [RouterModule,
    AdminRoutingModule, 
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
export class AdminModule {
  
}
