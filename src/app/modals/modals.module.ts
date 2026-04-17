import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseModalComponent } from './base-modal/base-modal.component';
import { ImportStudentModal } from './import-student/import-student.component';
import { ConfirmDeleteModal } from './confirm-delete/confirm-delete.component';
import { ConfirmSubmitModal } from './confirm-submit/confirm-submit.component';

const components = [
  BaseModalComponent,
  ImportStudentModal,
  ConfirmDeleteModal,
  ConfirmSubmitModal,
]

@NgModule({
  declarations: [ ...components],
  imports: [RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
    ],
  exports: [...components],
  providers: [],
})
export class ModalsModule {
  
}
