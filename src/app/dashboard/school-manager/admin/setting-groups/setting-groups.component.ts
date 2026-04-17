import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ApiRoutes } from '@models/api.routes';
import { Store } from '@ngrx/store';

@Component({
  selector: 'setting-groups',
  standalone: false,
  templateUrl: './setting-groups.component.html',
  styleUrl: './setting-groups.component.css'
})
export class SettingGroupsComponent {

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
