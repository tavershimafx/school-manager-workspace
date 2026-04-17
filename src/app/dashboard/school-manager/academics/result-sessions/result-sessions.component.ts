import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DialogService } from '@services/dialog-service';

@Component({
  selector: 'result-sessions',
  standalone: false,
  templateUrl: './result-sessions.component.html',
  styleUrl: './result-sessions.component.css'
})
export class ResultSessionsComponent {

  constructor(private dialogService: DialogService, private httpClient: HttpClient) {
      
    }
  
}
