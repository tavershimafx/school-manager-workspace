import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DialogService } from '@services/dialog-service';
import { UploadAssessmentModal } from '../upload-assessment/upload-assessment.component';
import { MoveAssessmentModal } from '../move-assessment/move-assessment.component';
import { DeleteAssessmentModal } from '../delete-assessment/delete-assessment.component';

@Component({
  selector: 'assessments',
  standalone: false,
  templateUrl: './assessments.component.html',
  styleUrl: './assessments.component.css'
})
export class AssessmentsComponent {

  names = ["John Doe", "Sarah Parker", "Liam Nelson", "Zoe Kravitz", "Marcus Aurelius", "Diana Prince", "Bruce Wayne", "Clark Kent", "Barry Allen", "Hal Jordan"];
  constructor(private dialogService: DialogService, private httpClient: HttpClient) {

  }



  moveAssess() {
    this.dialogService.showValueDialog(MoveAssessmentModal, {})?.subscribe({
      next: x => {
        if (x == true) {

        }
      }
    })
  }

  deleteAssess() {
    this.dialogService.showValueDialog(DeleteAssessmentModal, {})?.subscribe({
      next: x => {
        if (x == true) {

        }
      }
    })
  }

  uploadAssess() {
    this.dialogService.showValueDialog(UploadAssessmentModal, {})?.subscribe({
      next: x => {
        if (x == true) {

        }
      }
    })
  }
}
