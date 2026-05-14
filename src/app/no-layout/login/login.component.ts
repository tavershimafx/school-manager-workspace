import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import AuthorizeService from '../../security/auth.service';
import { utilitySelector } from '@store/utility.selectors';

@Component({
  selector: 'login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  store = inject(Store)
  dashboard = this.store.selectSignal(utilitySelector)
  error?: string
  isSubmitting = false
  isLoading = false
  returnUrl?: string | null
  loginForm: FormGroup = new FormGroup({
    "email": new FormControl("", Validators.compose([Validators.required])),
    "password": new FormControl("", Validators.compose([Validators.required])),
    "rememberMe": new FormControl("",)
  })

  constructor(private router: Router, private authorizeService: AuthorizeService,
    activatedRoute: ActivatedRoute
  ) {
    activatedRoute.queryParamMap.subscribe({
      next: p => {
        this.returnUrl = p.get("returnUrl")
        if((this.returnUrl?.match(/(returnUrl)/)?.length??0) > 1){
          this.returnUrl = "/"
        }
      }
    })
  }

  hasError(control: string) {
    return this.isSubmitting && this.loginForm.get(control)?.invalid;
  }

  submitLogin() {
    this.isSubmitting = true
    this.error = undefined
    if (this.loginForm.valid) {
      this.isLoading = true
      let f = {
        email: this.loginForm.controls["email"].value,
        password: this.loginForm.controls["password"].value,
        rememberMe: true
      }

      this.loginForm.disable()
      this.authorizeService.login(f).subscribe({
        next: res => {
          this.isLoading = false;
          this.loginForm.enable()
          if (res?.value?.upgradeRequired == true) {
            this.router.navigateByUrl(`/update-password?e=${res.value.email}&c=${res.value.code}`)
          } else {
            if(this.returnUrl && this.returnUrl != "/"){
              this.router.navigateByUrl(this.returnUrl)
            }else{
              this.router.navigateByUrl("/dashboard")
            }
          }
        },
        error: er => {
          this.loginForm.enable()
          this.isSubmitting = false
          this.isLoading = false;
          this.error = (er.error.errors as string[]).join("\n")
          return;
        }
      })
    }
  }
}
