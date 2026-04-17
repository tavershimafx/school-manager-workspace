import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DialogService } from '@services/dialog-service';

@Component({
  selector: 'group-actions-new',
  standalone: false,
  templateUrl: './group-actions-new.component.html',
  styleUrl: './group-actions-new.component.css'
})
export class GroupActionsNewComponent {

  constructor(private dialogService: DialogService, private httpClient: HttpClient) {

  }

}
