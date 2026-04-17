import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DialogService } from '@services/dialog-service';

@Component({
  selector: 'exam-overview',
  standalone: false,
  templateUrl: './exam-overview.component.html',
  styleUrl: './exam-overview.component.css'
})
export class ExamOverviewComponent {

  constructor(private dialogService: DialogService, private httpClient: HttpClient) {
      
    }
  
}
