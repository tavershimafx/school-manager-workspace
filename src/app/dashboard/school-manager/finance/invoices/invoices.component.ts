import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DialogService } from '@services/dialog-service';
import { CreateInvoiceModal } from '../create-invoice/create-invoice.component';

@Component({
  selector: 'scm-invoices',
  standalone: false,
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css'
})
export class InvoicesComponent {

  constructor(private dialogService: DialogService, private httpClient: HttpClient) {
      
    }
  
    newInvoice() {
      this.dialogService.showValueDialog(CreateInvoiceModal, {})?.subscribe({
        next: x => {
          if (x == true) {
  
          }
        }
      })
    }
  
}
