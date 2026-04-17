import { NgModule } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ClassSectionsComponent } from './sections/sections.component';
import { SectionSettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: "", component: IndexComponent, children: [
    { path: "", component: ClassSectionsComponent },
    { path: "settings", component: SectionSettingsComponent },
  ] },
  
]

@NgModule({
  imports: [],
  exports: [],
  providers: [provideRouter(routes)]
})
export class ClassSectionsRoutingModule {
  
}
