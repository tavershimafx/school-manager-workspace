import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { comparisonValidator, hasNumberValidator } from '@validators/app.validators';
import { getValidationMessages } from '@services/utilities';
import AuthorizeService from '../../security/auth.service';

@Component({
  selector: 'reset-password',
  standalone: false,
  templateUrl: './reset-password.component.html',
  styleUrls: ['../login/login.component.css']
})
export class ResetPasswordComponent {

  isLoading = false
  isSubmitting = false
  message?: string
  isError = false
  email?: string
  code?: string
  getErrors = getValidationMessages

  loginForm: FormGroup = new FormGroup({
    "userId": new FormControl("", Validators.compose([Validators.required])),
    "code": new FormControl("", Validators.compose([Validators.required])),
    "password": new FormControl(null, Validators.compose([Validators.required, Validators.minLength(8), hasNumberValidator()])),
    "confirmPassword": new FormControl(null, Validators.compose([Validators.required, comparisonValidator("password")]))
  })


  constructor(private authorizeService: AuthorizeService, activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    activatedRoute.queryParamMap.subscribe({
      next: x => {
        this.loginForm.patchValue({ userId: x.get("a") })
        this.loginForm.patchValue({ code: x.get("t") })
      }
    })
  }

  ngOnInit(): void {

  }


  submitLogin() {
    this.isSubmitting = true
    this.message = undefined
    this.isError = false
    if (this.loginForm.valid) {
      this.isLoading = true
      this.loginForm.disable()
      this.authorizeService.resetPassword(this.loginForm.value).subscribe({
        next: res => {
          this.router.navigateByUrl("/email-sent?t=pr")
        },
        error: er => {
          this.loginForm.enable()
          this.isSubmitting = this.isLoading = false
          this.isError = true
          this.message = (er.error.errors as string[]).join("\n")
          return;
        }
      })
    }
  }
}
