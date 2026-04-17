import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DialogService } from '@services/dialog-service';

@Component({
  selector: 'result-classes',
  standalone: false,
  templateUrl: './result-classes.component.html',
  styleUrl: './result-classes.component.css'
})
export class ResultClassesComponent {

  constructor(private dialogService: DialogService, private httpClient: HttpClient) {
      
    }
  
}
