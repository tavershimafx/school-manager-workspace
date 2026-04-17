import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { studentProfileSelector } from '@store/selectors/students.selectors';

@Component({
  selector: 'change-log',
  standalone: false,
  templateUrl: './change-log.component.html',
  styleUrl: './change-log.component.css'
})
export class ChangeLogComponent {

  private readonly store = inject(Store);
  student = this.store.selectSignal(studentProfileSelector)
  
  constructor(private httpClient: HttpClient) {
    
  }

}
