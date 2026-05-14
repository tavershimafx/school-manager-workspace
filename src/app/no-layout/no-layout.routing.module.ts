import { NgModule } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { NoLayoutComponent } from './no-layout.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EmailSentComponent } from './email-sent/email-sent.component';
import { PasswordCodeComponent } from './password-code/password-code.component';

const routes: Routes = [
  { path: "", component: NoLayoutComponent, children:[
    { path: "", component: LoginComponent },
    { path: "reset-password", component: ResetPasswordComponent },
    { path: "forgot-password", component: ForgotPasswordComponent },
    { path: "email-sent", component: EmailSentComponent },
    { path: "pass-code", component: PasswordCodeComponent }
  ] },
]

@NgModule({
  imports: [],
  exports: [],
  providers: [provideRouter(routes)]
})
export class NoLayoutRoutingModule {
  
}
