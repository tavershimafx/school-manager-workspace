import { Component, Input } from '@angular/core';
import { DialogService } from '@services/dialog-service';

@Component({
  selector: 'base-modal',
  standalone: false,
  templateUrl: './base-modal.component.html',
  styleUrl: './base-modal.component.css'
})
export class BaseModalComponent {
  @Input("icon") icon?: string
  @Input("title") title?: string
  @Input("module") module?: string
  @Input("subModule") subModule?: string
  @Input("description") description?: string

  constructor(private dialogService: DialogService){

  }
  closeDialog(){
    this.dialogService.closeDialog(false)
  }
}
