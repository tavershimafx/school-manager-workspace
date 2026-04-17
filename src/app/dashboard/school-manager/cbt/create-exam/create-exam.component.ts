import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DialogService } from '@services/dialog-service';

@Component({
  selector: 'create-exam',
  standalone: false,
  templateUrl: './create-exam.component.html',
  styleUrl: './create-exam.component.css'
})
export class CreateExamComponent {

  constructor(private dialogService: DialogService, private httpClient: HttpClient) {
      
    }
  
  
}
