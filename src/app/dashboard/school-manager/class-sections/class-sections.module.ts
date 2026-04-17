import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClassSectionsRoutingModule } from './class-sections.routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from '@modals/modals.module';
import DirectivesModule from '@directives/directives.module';
import PipesModule from '@pipes/pipes.module';
import { IndexComponent } from './index/index.component';
import { ClassSectionsComponent } from './sections/sections.component';
import { SectionSettingsComponent } from './settings/settings.component';
import { NewSectionModal } from './new-section/new-section.component';
import { NewSectionSettingModal } from './new-setting/new-setting.component';

const components = [
  IndexComponent,
  ClassSectionsComponent,
  SectionSettingsComponent,
  NewSectionModal,
  NewSectionSettingModal
]

@NgModule({
  declarations: [...components],
  imports: [RouterModule,
    ClassSectionsRoutingModule, 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalsModule,
    DirectivesModule,
    PipesModule
    ],
  exports: [],
  providers: [],
})
export class ClassSectionsModule {
  
}
