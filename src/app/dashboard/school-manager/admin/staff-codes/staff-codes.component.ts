import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ApiRoutes } from '@models/api.routes';
import { Store } from '@ngrx/store';

@Component({
  selector: 'dash-staff-codes',
  standalone: false,
  templateUrl: './staff-codes.component.html',
  styleUrl: './staff-codes.component.css'
})
export class StaffCodesComponent {

  private readonly store = inject(Store);
  
  constructor(private httpClient: HttpClient) {
    
  }

}
