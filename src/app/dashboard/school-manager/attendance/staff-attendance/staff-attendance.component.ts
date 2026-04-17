import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'staff-attendance',
  standalone: false,
  templateUrl: './staff-attendance.component.html',
  styleUrl: './staff-attendance.component.css'
})
export class StaffAttendanceComponent {

  constructor(private httpClient: HttpClient) {
    
  }

}
