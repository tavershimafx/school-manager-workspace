import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ApiRoutes } from '@models/api.routes';
import { AvailableClassResult, StudentDashboard } from '@models/app.models';
import { Store } from '@ngrx/store';
import { studentProfileSelector } from '@store/selectors/students.selectors';

@Component({
  selector: 'dashboard-index',
  standalone: false,
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class DashboardIndexComponent {

  private readonly store = inject(Store);
  student = this.store.selectSignal(studentProfileSelector)
  results?: AvailableClassResult[]
  barX: string[] = []
  barSeries: { name: string, data: number[] }[] = []
  // {
  //   name: "Your's",
  //   data: []//[44, 55, 57, 56, 61, 58]
  // },
  // {
  //   name: "Highest",
  //   data: []//[76, 85, 92, 95, 87, 99]
  // },
  // {
  //   name: "Lowest",
  //   data: []//[35, 41, 36, 26, 45, 48]
  // }

  //barOptions?: Partial<ChartOptions>;
  dashboardView?: StudentDashboard
  constructor(private httpClient: HttpClient) {
    this.getDashboard()
    this.getResults()
  }

  randomWidth() {
    return `${Math.floor(Math.random() * 100)}%`
  }
  
  private getResults() {
    this.httpClient.get<any>(ApiRoutes.resultChecker.availResults).subscribe({
      next: res => {
        this.results = res.value
      }
    })
  }

  private getDashboard() {
    this.httpClient.get<any>(ApiRoutes.student.dashboard).subscribe({
      next: res => {
        this.dashboardView = res.value
        
      },
      error: er => {
        throw "Cannot load dashboard at the moment. An error occured loading student dashboard"
      }
    })
  }
}
