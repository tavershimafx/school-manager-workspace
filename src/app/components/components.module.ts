import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextGroupComponent } from './text-group/text-group.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchUtilityComponent } from './search-utility/search-utility.component';
import { TextInputComponent } from './text-input/text-input.component';
import { SelectInputComponent } from './select-input/select-input.component';
import { BaseModalDialogComponent } from './base-modal/base-modal.component';
import PipesModule from '@pipes/pipes.module';
import { SearchSelectComponent } from './search-select/search-select.component';
import DirectivesModule from '@directives/directives.module';
import { WorkbookComponent } from './workbook/workbook.component';
import { TagsInputComponent } from './tags-input/tags-input.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';

const components = [
  TextInputComponent,
  TextGroupComponent,
  PaginationComponent,
  SelectInputComponent,
  SearchUtilityComponent,
  BaseModalDialogComponent,
  SearchSelectComponent,
  TagsInputComponent,
  WorkbookComponent,
  SpinnerComponent,
  AdminSidebarComponent
]

@NgModule({
  declarations: [ ...components],
  imports: [RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    PipesModule
    ],
  exports: [ ...components],
  providers: [],
})
export class ComponentsModule {
  
}
