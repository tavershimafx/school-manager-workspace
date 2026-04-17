import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ApiRoutes } from '@models/api.routes';
import { Store } from '@ngrx/store';
import { DialogService } from '@services/dialog-service';
import { NewTenantModal } from '../new-tenant/new-tenant.component';

@Component({
  selector: 'tenants',
  standalone: false,
  templateUrl: './tenants.component.html',
  styleUrl: './tenants.component.css'
})
export class TenantsComponent {

  private readonly store = inject(Store);


  constructor(private dialogService: DialogService, private httpClient: HttpClient) {

  }

  newTenant() {
    this.dialogService.showValueDialog(NewTenantModal, {})?.subscribe({
      next: x => {
        if (x == true) {

        }
      }
    })
  }
}
