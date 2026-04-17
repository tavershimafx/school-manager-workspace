import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DialogService } from '@services/dialog-service';
import { NewSectionModal } from '../new-section/new-section.component';

@Component({
  selector: 'class-sections',
  standalone: false,
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.css'
})
export class ClassSectionsComponent {

  constructor(private dialogService: DialogService, private httpClient: HttpClient) {
    
  }

  newSection(){
    this.dialogService.showValueDialog(NewSectionModal, {})?.subscribe({
          next: x => {
            if (x == true) {
              
            }
          }
        })
  }

}
