import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ApiRoutes } from '@models/api.routes';
import { Store } from '@ngrx/store';

@Component({
  selector: 'school-settings',
  standalone: false,
  templateUrl: './school-settings.component.html',
  styleUrl: './school-settings.component.css'
})
export class SchoolSettingsComponent {

  private readonly store = inject(Store);
  
  constructor(private httpClient: HttpClient) {
    
  }


  private getDashboard() {
    this.httpClient.get<any>(ApiRoutes.student.dashboard).subscribe({
      next: res => {
        
      },
      error: er => {
        throw "Cannot load dashboard at the moment. An error occured loading student dashboard"
      }
    })
  }
}
