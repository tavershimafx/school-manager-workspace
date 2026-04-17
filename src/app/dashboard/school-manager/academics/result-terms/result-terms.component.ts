import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DialogService } from '@services/dialog-service';

@Component({
  selector: 'result-terms',
  standalone: false,
  templateUrl: './result-terms.component.html',
  styleUrl: './result-terms.component.css'
})
export class ResultTermsComponent {

  constructor(private dialogService: DialogService, private httpClient: HttpClient) {
      
    }
  
}
