import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'student-spreadsheet',
  standalone: false,
  templateUrl: './student-spreadsheet.component.html',
  styleUrl: './student-spreadsheet.component.css'
})
export class StudentSpreadsheetComponent {

  constructor(private httpClient: HttpClient) {
    
  }

}
