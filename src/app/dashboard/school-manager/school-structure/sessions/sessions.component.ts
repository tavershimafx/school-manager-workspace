import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DialogService } from '@services/dialog-service';
import { NewSessionModal } from '../new-session/new-session.component';

@Component({
  selector: 'scm-sessions',
  standalone: false,
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.css'
})
export class SessionsComponent {

  constructor(private dialogService: DialogService, private httpClient: HttpClient) {
    
  }

  newSession() {
   
    this.dialogService.showValueDialog(NewSessionModal, {})?.subscribe({
      next: x => {
        if (x == true) {
          
        }
      }
    })
  }
}
