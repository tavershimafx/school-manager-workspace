import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ApiRoutes } from '@models/api.routes';
import { Store } from '@ngrx/store';

@Component({
  selector: 'dash-nav',
  standalone: false,
  templateUrl: './dash-nav.component.html',
  styleUrl: './dash-nav.component.css'
})
export class DashNavComponent {

  private readonly store = inject(Store);
  
  constructor(private httpClient: HttpClient) {
    
  }
}
