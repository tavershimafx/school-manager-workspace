import { Component, Input } from '@angular/core';
import { DialogService } from '@services/dialog-service';

@Component({
  selector: 'confirm-submit',
  standalone: false,
  templateUrl: './confirm-submit.component.html',
  styleUrl: './confirm-submit.component.css'
})
export class ConfirmSubmitModal {

  @Input() data?: { message: string, title: string}
  constructor(private dialogService: DialogService) {
    }

  closeDialog(s: boolean){
     this.dialogService.closeDialog(s)
  }

  confirm(){
     this.closeDialog(true)
  }
}
