import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DialogService } from '@services/dialog-service';
import { UploadAssessmentModal } from '../upload-assessment/upload-assessment.component';
import { MoveAssessmentModal } from '../move-assessment/move-assessment.component';
import { DeleteAssessmentModal } from '../delete-assessment/delete-assessment.component';

@Component({
  selector: 'group-actions',
  standalone: false,
  templateUrl: './group-actions.component.html',
  styleUrl: './group-actions.component.css'
})
export class GroupActionsComponent {

  constructor(private dialogService: DialogService, private httpClient: HttpClient) {

  }

}
