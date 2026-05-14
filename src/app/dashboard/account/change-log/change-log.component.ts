import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'change-log',
  standalone: false,
  templateUrl: './change-log.component.html',
  styleUrl: './change-log.component.css'
})
export class ChangeLogComponent {

  private readonly store = inject(Store);
  
  constructor(private httpClient: HttpClient) {
    
  }

}
