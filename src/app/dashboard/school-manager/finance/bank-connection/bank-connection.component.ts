import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DialogService } from '@services/dialog-service';
import { NewConnectionModal } from '../new-connection/new-connection.component';

@Component({
  selector: 'bank-connection',
  standalone: false,
  templateUrl: './bank-connection.component.html',
  styleUrl: './bank-connection.component.css'
})
export class BankConnectionComponent {

  constructor(private dialogService: DialogService, private httpClient: HttpClient) {

  }


  newConnection() {
    this.dialogService.showValueDialog(NewConnectionModal, {})?.subscribe({
      next: x => {
        if (x == true) {

        }
      }
    })
  }
}
