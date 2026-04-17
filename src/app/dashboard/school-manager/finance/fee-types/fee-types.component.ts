import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DialogService } from '@services/dialog-service';
import { CreateFeeTypeModal } from '../create-feetype/create-feetype.component';

@Component({
  selector: 'fee-types',
  standalone: false,
  templateUrl: './fee-types.component.html',
  styleUrl: './fee-types.component.css'
})
export class FeeTypesComponent {

  constructor(private dialogService: DialogService, private httpClient: HttpClient) {
      
    }
  
      newFeeType() {
        this.dialogService.showValueDialog(CreateFeeTypeModal, {})?.subscribe({
          next: x => {
            if (x == true) {
    
            }
          }
        })
      }
}
