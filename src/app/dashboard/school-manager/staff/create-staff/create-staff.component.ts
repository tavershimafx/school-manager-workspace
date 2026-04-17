import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DialogService } from '@services/dialog-service';

@Component({
  selector: 'create-staff',
  standalone: false,
  templateUrl: './create-staff.component.html',
  styleUrl: './create-staff.component.css'
})
export class CreateStaffComponent {

  constructor(private dialogService: DialogService, private httpClient: HttpClient) {
      
    }
  
  
}
