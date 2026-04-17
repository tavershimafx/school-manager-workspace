import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DialogService } from '@services/dialog-service';
import { CreateAccountsModal } from '../create-accounts/create-accounts.component';

@Component({
  selector: 'scm-accounts',
  standalone: false,
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class VirtualAccountsComponent {

  constructor(private dialogService: DialogService, private httpClient: HttpClient) {
      
    }
  
 
     createAccounts() {
       this.dialogService.showValueDialog(CreateAccountsModal, {})?.subscribe({
         next: x => {
           if (x == true) {
   
           }
         }
       })
     } 
}
