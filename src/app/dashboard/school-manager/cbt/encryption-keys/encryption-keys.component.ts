import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DialogService } from '@services/dialog-service';

@Component({
  selector: 'encryption-keys',
  standalone: false,
  templateUrl: './encryption-keys.component.html',
  styleUrl: './encryption-keys.component.css'
})
export class EncryptionKeysComponent {

  constructor(private dialogService: DialogService, private httpClient: HttpClient) {
      
    }
  
  
}
