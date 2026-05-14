import { Component, Input } from '@angular/core';
import { DialogService } from '@services/dialog-service';

@Component({
  selector: 'delete-dialog',
  standalone: false,
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogModal{
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
