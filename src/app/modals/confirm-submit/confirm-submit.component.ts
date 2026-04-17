import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'confirm-submit',
  standalone: false,
  templateUrl: './confirm-submit.component.html',
  styleUrl: './confirm-submit.component.css'
})
export class ConfirmSubmitModal {

  @Output() submitted: EventEmitter<boolean> = new EventEmitter()
  constructor() {
  }

  closeDialog(s: boolean){
    this.submitted.emit(s)
  }

  confirm(){
     this.closeDialog(true)
  }
}
