import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { utilitySelector } from '@store/utility.selectors';
import AuthorizeService from '../../security/auth.service';

@Component({
  selector: 'password-code',
  standalone: false,
  templateUrl: './password-code.component.html',
  styleUrl: './password-code.component.css'
})
export class PasswordCodeComponent {
  store = inject(Store)
  dashboard = this.store.selectSignal(utilitySelector)
  errorMessage?: string
  isSubmitting = false
  isLoading = false

  a?: string | null
  
  loginForm: FormGroup = new FormGroup({
    "userId": new FormControl("", Validators.compose([Validators.required])),
    "code": new FormControl("", Validators.compose([Validators.required])),
  })

  constructor(private router: Router, private authorizeService: AuthorizeService,
    activated: ActivatedRoute
  ){
    activated.queryParamMap.subscribe({
      next: x =>{
        this.a = x.get("a")
        this.loginForm.patchValue({userId: x.get("a")})
      }
    })
  }

  submitReset(){
      this.isSubmitting = true
      this.errorMessage = undefined
    if(this.loginForm.valid){
      this.isLoading = true
      this.loginForm.disable()
      
      this.authorizeService.validateCode(this.loginForm.value).subscribe({
        next: res =>{
            this.isLoading = false;
            this.loginForm.enable()
            this.router.navigateByUrl(`/reset-password?a=${this.a}&t=${res}`)
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
