import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiRoutes } from '@models/api.routes';
import { comparisonValidator } from '@validators/app.validators';
import { getValidationMessages } from '@services/utilities';

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
    "password": new FormControl(null, Validators.compose([Validators.required])),
    "confirmPassword": new FormControl(null, Validators.compose([Validators.required, comparisonValidator("password")]))
  })


  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute){
    this.loginForm.valueChanges.subscribe({
      next: (e) =>{
        this.isSubmitting = false
      }
    })
  }

 ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe({
      next: p =>{
        this.email = p.get("e")!
        this.code = p.get("c")!
      }
    })
  }

  
  submitLogin(){
    this.isSubmitting = true
          this.message = undefined
            this.isError = false
        if(this.loginForm.valid){
          if(this.loginForm.controls["password"].value != this.loginForm.controls["confirmPassword"].value){
            this.message = "Password and Confirm password do not match"
            this.isError = true
            return
          }
          this.isLoading = true
          let f = {
            email: this.email,
            password: this.loginForm.controls["password"].value,
            code: this.code
          }
          this.httpClient.post<any>(ApiRoutes.identity.updatePass, f).subscribe({
            next: res =>{
                this.isLoading = false;
                this.message = "Password updated successfully"
                this.isError = false
            },
            error: er =>{
              this.isSubmitting = false
              this.isLoading = false;
              this.isError = true
              this.message = (er.error.errors as string[]).join("\n")
              return;
            }
        })
        }
      }
}
