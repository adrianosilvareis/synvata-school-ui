import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentFormComponent } from './containers/student-form/student-form.component';

import { StudentsComponent } from './containers/students/students.component';

const routes: Routes = [
  { path: '', component: StudentsComponent },
  { path: 'new', component: StudentFormComponent},
  { path: 'edit/:id', component: StudentFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
