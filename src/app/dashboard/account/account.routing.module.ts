import { NgModule } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { AccountOverviewComponent } from './overview/overview.component';
import { ChangeLogComponent } from './change-log/change-log.component';

const routes: Routes = [
    { path: "", component: AccountOverviewComponent },
    { path: "change-log", component: ChangeLogComponent },
]

@NgModule({
  imports: [],
  exports: [],
  providers: [provideRouter(routes)]
})
export class AccountRoutingModule {
  
}
