import { NgModule } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { ClassesComponent } from './classes/classes.component';
import { SessionsComponent } from './sessions/sessions.component';

const routes: Routes = [
  { path: "", component: IndexComponent, children: [
    { path: "", component: SubjectsComponent },
    { path: "subjects", component: SubjectsComponent },
  { path: "classes", component: ClassesComponent },
  { path: "sessions", component: SessionsComponent },
  ] },
  
]

@NgModule({
  imports: [],
  exports: [],
  providers: [provideRouter(routes)]
})
export class SchoolStructureRoutingModule {
  
}
