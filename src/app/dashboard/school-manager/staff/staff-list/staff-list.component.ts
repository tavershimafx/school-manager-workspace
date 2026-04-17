import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DialogService } from '@services/dialog-service';

@Component({
  selector: 'staff-list',
  standalone: false,
  templateUrl: './staff-list.component.html',
  styleUrl: './staff-list.component.css'
})
export class StaffListComponent {

  constructor(private dialogService: DialogService, private httpClient: HttpClient) {
      
    }
  
}
