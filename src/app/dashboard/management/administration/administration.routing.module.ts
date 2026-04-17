import { NgModule } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { NewUserComponent } from './new-user/new-user.component';
import { NewRoleComponent } from './new-role/new-role.component';
import { AuditLogsComponent } from './audit-logs/audit-logs.component';

const routes: Routes = [
    { path: "", component: UsersComponent },
    { path: "users", component: UsersComponent },
    { path: "new-user", component: NewUserComponent },
    { path: "roles", component: RolesComponent },
    { path: "new-role", component: NewRoleComponent },
    { path: "audit-logs", component: AuditLogsComponent },
]

@NgModule({
  imports: [],
  exports: [],
  providers: [provideRouter(routes)]
})
export class AdministrationRoutingModule {
  
}
