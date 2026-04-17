import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from '@services/dialog-service';

@Component({
  selector: 'confirm-delete',
  standalone: false,
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.css'
})
export class ConfirmDeleteModal implements OnInit{
  @Input() data?: {message: string, item: string}

  constructor(private dialogService: DialogService) {
  }

  ngOnInit(): void {
  }

  closeDialog(s: boolean){
    this.dialogService.closeDialog(s)
  }

  confirm(){
     this.closeDialog(true)
  }
}
