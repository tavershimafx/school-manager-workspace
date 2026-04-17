import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiRoutes } from '@models/api.routes';
import { Store } from '@ngrx/store';
import { dashboardSelector } from '@store/selectors/students.selectors';

@Component({
  selector: 'forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  store = inject(Store)
  dashboard = this.store.selectSignal(dashboardSelector)
  errorMessage?: string
  isSubmitting = false
  isLoading = false
  constructor(private router: Router, private httpClient: HttpClient){
  }

  loginForm: FormGroup = new FormGroup({
    "email": new FormControl("", Validators.compose([Validators.required])),
    "password": new FormControl("", Validators.compose([Validators.required])),
    "rememberMe": new FormControl(true)
  })

  submitLogin(){
      this.isSubmitting = true
    if(this.loginForm.valid){
      this.isLoading = true
      this.loginForm.disable()
      let f = {
        email: this.loginForm.controls["email"].value,
        password: this.loginForm.controls["password"].value,
        rememberMe: true
      }
      this.httpClient.post<any>(ApiRoutes.identity.login, f).subscribe({
        next: res =>{
            this.isLoading = false;
            this.loginForm.enable()
            if(res.value?.upgradeRequired == true){
              this.router.navigateByUrl(`/update-password?e=${res.value.email}&c=${res.value.code}`)
            }else{
              this.router.navigateByUrl("/dashboard")
              return;
            }
        },
        error: er =>{
        this.loginForm.enable()
          this.isSubmitting = false
          this.isLoading = false
          this.errorMessage = er.error.errors.reduce((a:string, b:string) => {return `${a}\n${b}`})
        }
    })
    }
  }
}
