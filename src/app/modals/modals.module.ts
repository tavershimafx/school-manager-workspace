import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseModalComponent } from './base-modal/base-modal.component';
import { DeleteDialogModal } from './delete-dialog/delete-dialog.component';
import { ConfirmSubmitModal } from './confirm-submit/confirm-submit.component';
import { WarningDialogModal } from './warning-dialog/warning-dialog.component';
import { NewTabDialogModal } from './newtab-dialog/newtab-dialog.component';
import { ComponentsModule } from '@components/components.module';

const components = [
  BaseModalComponent,
  DeleteDialogModal,
  ConfirmSubmitModal,
  WarningDialogModal,
  NewTabDialogModal
]

@NgModule({
  declarations: [ ...components],
  imports: [RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
    ],
  exports: [...components],
  providers: [],
})
export class ModalsModule {
  
}
