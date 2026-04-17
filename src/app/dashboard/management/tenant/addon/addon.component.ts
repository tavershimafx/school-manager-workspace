import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ApiRoutes } from '@models/api.routes';
import { Store } from '@ngrx/store';
import { DialogService } from '@services/dialog-service';
import { AssignAddonModal } from '../assign-addon/assign-addon.component';

@Component({
  selector: 'addons',
  standalone: false,
  templateUrl: './addon.component.html',
  styleUrl: './addon.component.css'
})
export class AddonComponent {

  private readonly store = inject(Store);
  
  constructor(private dialogService: DialogService, private httpClient: HttpClient) {
    
  }
    
    assignAddon() {
      this.dialogService.showValueDialog(AssignAddonModal, {})?.subscribe({
        next: x => {
          if (x == true) {
            
          }
        }
      })
    }
}
