import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '@services/dialog-service';

@Component({
  selector: 'newtab-dialog',
  standalone: false,
  templateUrl: './newtab-dialog.component.html',
  styleUrl: './newtab-dialog.component.css'
})
export class NewTabDialogModal {
  isSubmitting = false
  newTabForm: FormGroup = new FormGroup({
    "tabType": new FormControl("", Validators.compose([Validators.required])),
    "tenantId": new FormControl("", Validators.compose([Validators.required])),
  })

  constructor(private dialogService: DialogService) {
  }

  closeDialog() {
    this.dialogService.closeDialog(false)
  }

  next() {
    this.isSubmitting = true
    if (this.newTabForm.value.tabType == "AdminTab") {
      this.dialogService.closeDialog(true)
    }else if(this.newTabForm.value.tabType == "SchoolTab" && this.newTabForm.valid){
      this.dialogService.closeDialog(true)
    }
  }
}
