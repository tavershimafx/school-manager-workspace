import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DialogService } from '@services/dialog-service';
import { CreateSubjectModal } from '../create-subject/create-subject.component';

@Component({
  selector: 'scm-subjects',
  standalone: false,
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
})
export class SubjectsComponent {

  constructor(private dialogService: DialogService, private httpClient: HttpClient) {
    
  }

  

  newSubject() {
    this.dialogService.showValueDialog(CreateSubjectModal, {})?.subscribe({
      next: x => {
        if (x == true) {
          
        }
      }
    })
  }
}
