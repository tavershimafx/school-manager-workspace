import { Component, Input } from '@angular/core';
import { DialogService } from '@services/dialog-service';

@Component({
  selector: 'warning-dialog',
  standalone: false,
  templateUrl: './warning-dialog.component.html',
  styleUrl: './warning-dialog.component.css'
})
export class WarningDialogModal{
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
