import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DialogService } from '@services/dialog-service';
import { GenerateEnrollmentModal } from '../generate-enrollment/generate-enrollment.component';
import { ClearEnrollmentModal } from '../clear-enrollment/clear-enrollment.component';
import { ResetPasswordsModal } from '../reset-passwords/reset-passwords.component';

@Component({
  selector: 'spool-filters',
  standalone: false,
  templateUrl: './spool-filters.component.html',
  styleUrl: './spool-filters.component.css'
})
export class SpoolFiltersModal {

  constructor(private dialogService: DialogService, private httpClient: HttpClient) {
      
    }
  
}
