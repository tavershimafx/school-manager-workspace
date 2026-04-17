import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DialogService } from '@services/dialog-service';
import { NewClassModal } from '../new-class/new-class.component';

@Component({
  selector: 'scm-classes',
  standalone: false,
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css'
})
export class ClassesComponent {

  constructor(private dialogService: DialogService, private httpClient: HttpClient) {
    
  }

  newClass() {
   
    this.dialogService.showValueDialog(NewClassModal, {})?.subscribe({
      next: x => {
        if (x == true) {
          
        }
      }
    })
  }
}
