import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DialogService } from '@services/dialog-service';
import { NewSectionSettingModal } from '../new-setting/new-setting.component';

@Component({
  selector: 'section-settings',
  standalone: false,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SectionSettingsComponent {

  constructor(private dialogService: DialogService, private httpClient: HttpClient) {
    
  }

  newSetting(){
    this.dialogService.showValueDialog(NewSectionSettingModal, {})?.subscribe({
          next: x => {
            if (x == true) {
              
            }
          }
        })
  }
}
