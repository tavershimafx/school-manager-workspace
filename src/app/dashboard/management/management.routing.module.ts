import { NgModule } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';

const routes: Routes = [
    { path: "", loadChildren: () => import('./administration/administration.module').then(k => k.AdministrationModule) },
    { path: "admin", loadChildren: () => import('./administration/administration.module').then(k => k.AdministrationModule) }
]

@NgModule({
  imports: [],
  exports: [],
  providers: [provideRouter(routes)]
})
export class ManagementRoutingModule {
  
}
