import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'class-subject',
  standalone: false,
  templateUrl: './class-subject.component.html',
  styleUrl: './class-subject.component.css'
})
export class ClassSubjectComponent {

  constructor(private httpClient: HttpClient) {
    
  }

}
