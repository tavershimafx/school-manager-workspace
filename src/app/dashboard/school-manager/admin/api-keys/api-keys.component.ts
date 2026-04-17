import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ApiRoutes } from '@models/api.routes';
import { Store } from '@ngrx/store';

@Component({
  selector: 'api-keys',
  standalone: false,
  templateUrl: './api-keys.component.html',
  styleUrl: './api-keys.component.css'
})
export class ApiKeysComponent {

  private readonly store = inject(Store);
  
  constructor(private httpClient: HttpClient) {
    
  }

}
