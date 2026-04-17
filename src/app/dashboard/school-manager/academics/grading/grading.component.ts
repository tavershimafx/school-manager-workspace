import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DialogService } from '@services/dialog-service';

@Component({
  selector: 'grading',
  standalone: false,
  templateUrl: './grading.component.html',
  styleUrl: './grading.component.css'
})
export class GradingComponent {

  constructor(private dialogService: DialogService, private httpClient: HttpClient) {
      
    }
  
}
