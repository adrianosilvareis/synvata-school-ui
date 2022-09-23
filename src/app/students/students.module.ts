import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentsComponent } from './containers/students/students.component';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentFormComponent } from './containers/student-form/student-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentListComponent,
    StudentFormComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class StudentsModule { }
