import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { utilitySelector } from '@store/utility.selectors';
import AuthorizeService from '../../security/auth.service';

@Component({
  selector: 'forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  store = inject(Store)
  dashboard = this.store.selectSignal(utilitySelector)
  errorMessage?: string
  isSubmitting = false
  isLoading = false
  constructor(private router: Router, private authorizeService: AuthorizeService){
  }

  loginForm: FormGroup = new FormGroup({
    "email": new FormControl("", Validators.compose([Validators.required])),
  })

  submitReset(){
      this.isSubmitting = true
      this.errorMessage = undefined
    if(this.loginForm.valid){
      this.isLoading = true
      this.loginForm.disable()
      
      this.authorizeService.forgotPassword(this.loginForm.value).subscribe({
        next: res =>{
            this.isLoading = false;
            this.loginForm.enable()
            this.router.navigateByUrl(`/pass-code?a=${res}`)
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
