import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DialogService } from '@services/dialog-service';
import { GenerateEnrollmentModal } from '../generate-enrollment/generate-enrollment.component';
import { ClearEnrollmentModal } from '../clear-enrollment/clear-enrollment.component';
import { ResetPasswordsModal } from '../reset-passwords/reset-passwords.component';
import { SpoolFiltersModal } from '../spool-filters/spool-filters.component';

@Component({
  selector: 'student-list',
  standalone: false,
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {

  constructor(private dialogService: DialogService, private httpClient: HttpClient) {
      
    }
  
    
  
    generateEnroll() {
      this.dialogService.showValueDialog(GenerateEnrollmentModal, {})?.subscribe({
        next: x => {
          if (x == true) {
            
          }
        }
      })
    }

    clearEnroll() {
      this.dialogService.showValueDialog(ClearEnrollmentModal, {})?.subscribe({
        next: x => {
          if (x == true) {
            
          }
        }
      })
    }

    resetPasswords() {
      this.dialogService.showValueDialog(ResetPasswordsModal, {})?.subscribe({
        next: x => {
          if (x == true) {
            
          }
        }
      })
    }

    admissionList() {
      this.dialogService.showValueDialog(SpoolFiltersModal, {})?.subscribe({
        next: x => {
          if (x == true) {
            
          }
        }
      })
    }

}
