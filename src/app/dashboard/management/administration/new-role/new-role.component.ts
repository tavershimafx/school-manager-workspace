import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ApiRoutes } from '@models/api.routes';
import { AvailableClassResult, StudentDashboard } from '@models/app.models';
import { Store } from '@ngrx/store';
import { studentProfileSelector } from '@store/selectors/students.selectors';

@Component({
  selector: 'dash-new-role',
  standalone: false,
  templateUrl: './new-role.component.html',
  styleUrl: './new-role.component.css'
})
export class NewRoleComponent {

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
