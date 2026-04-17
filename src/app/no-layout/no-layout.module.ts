import { NgModule } from '@angular/core';
import { NoLayoutComponent } from './no-layout.component';
import { RouterModule } from '@angular/router';
import { NoLayoutRoutingModule } from './no-layout.routing.module';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { provideState } from '@ngrx/store';
import { dashboardStateReducer } from '@store/reducers/utility.reducers';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NoLayoutFooterComponent } from './footer/footer.component';

const components = [
  NoLayoutComponent,
  NoLayoutFooterComponent,
  LoginComponent,
  ResetPasswordComponent,
  ForgotPasswordComponent,
  NotFoundComponent
]

@NgModule({
  declarations: [ ...components],
  imports: [RouterModule,
    NoLayoutRoutingModule, 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ],
  exports: [],
  providers: [
      provideState("dashboard", dashboardStateReducer),
  ],
})
export class NoLayoutModule {
  
}
