import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ApiRoutes } from '@models/api.routes';
import { IKeyValue } from '@models/app.models';
import { DialogService } from '@services/dialog-service';

@Component({
  selector: 'new-section',
  standalone: false,
  templateUrl: './new-section.component.html',
  styleUrl: './new-section.component.css'
})
export class NewSectionModal implements OnInit {
  @Input() data?: {
    id: any, status: string,
    name: string, message: string,
    statusUrl: string,
    updateUrl: string,
    modalTitle: string, modalDescription: string
  }
  newVal?: string
  statuses: IKeyValue[] = []
  isLoading = false

  constructor(private dialogService: DialogService, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.getStatus()
    this.newVal = this.data?.status
  }

  closeDialog(s: boolean) {
    this.dialogService.closeDialog(s)
  }
  
  private getStatus() {
    this.httpClient.get<any>(this.data!.statusUrl).subscribe({
      next: res => {
        this.statuses = res.value
      },
      error: er => {

      }
    })
  }
}
