import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserProfile } from '../../store/dashboard.selectors';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { comparisonValidator } from '@validators/app.validators';
import { DialogService } from '@services/dialog-service';
import { AccountServices } from '../account.services';

@Component({
  selector: 'overview',
  standalone: false,
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class AccountOverviewComponent {

  store = inject(Store);
  userProfile = this.store.selectSignal(selectUserProfile)
  
  passwordSubmitting = false
  passForm: FormGroup = new FormGroup({
    "oldPassword": new FormControl("", Validators.compose([Validators.required])),
    "newPassword": new FormControl("", Validators.compose([Validators.required])),
    "confirmPassword": new FormControl("", Validators.compose([Validators.required, comparisonValidator('newPassword')])),
  })

  constructor(private dialogService: DialogService, private accountService: AccountServices) {

  }

  changePassword() {
    this.passwordSubmitting = true
    if (this.passForm.valid) {
      this.passForm.disable()
      this.accountService.updatePassword(this.passForm.value).subscribe({
        next: x => {
          this.passwordSubmitting = false
          this.passForm.enable()
          this.dialogService.showNotification("Password Updated", "User password updated successfully", "success")
        },
        error: x => {
          this.passwordSubmitting = false
          this.passForm.enable()
        }
      })
    }
  }

}
