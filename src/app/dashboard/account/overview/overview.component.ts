import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { studentProfileSelector } from '@store/selectors/students.selectors';

@Component({
  selector: 'overview',
  standalone: false,
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class AccountOverviewComponent {

  private readonly store = inject(Store);
  student = this.store.selectSignal(studentProfileSelector)
  
  constructor(private httpClient: HttpClient) {
    
  }

}
