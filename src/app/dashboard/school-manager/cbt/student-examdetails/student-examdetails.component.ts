import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DialogService } from '@services/dialog-service';

@Component({
  selector: 'student-examdetails',
  standalone: false,
  templateUrl: './student-examdetails.component.html',
  styleUrl: './student-examdetails.component.css'
})
export class StudentExamDetailsComponent {

  constructor(private dialogService: DialogService, private httpClient: HttpClient) {
      
    }
  
}
