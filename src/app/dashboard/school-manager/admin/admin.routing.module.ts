import { NgModule } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { NewUserComponent } from './new-user/new-user.component';
import { NewRoleComponent } from './new-role/new-role.component';
import { SchoolSettingsComponent } from './school-settings/school-settings.component';
import { AuditLogsComponent } from './audit-logs/audit-logs.component';
import { SettingGroupsComponent } from './setting-groups/setting-groups.component';
import { StaffCodesComponent } from './staff-codes/staff-codes.component';
import { ApiKeysComponent } from './api-keys/api-keys.component';

const routes: Routes = [
  { path: "", component: UsersComponent },
      { path: "users", component: UsersComponent },
      { path: "new-user", component: NewUserComponent },
      { path: "roles", component: RolesComponent },
      { path: "new-role", component: NewRoleComponent },
      { path: "school-settings", component: SchoolSettingsComponent },
      { path: "staff-codes", component: StaffCodesComponent },
      { path: "setting-groups", component: SettingGroupsComponent },
      { path: "audit-logs", component: AuditLogsComponent },
      { path: "api-keys", component: ApiKeysComponent },
]

@NgModule({
  imports: [],
  exports: [],
  providers: [provideRouter(routes)]
})
export class AdminRoutingModule {
  
}
