import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentsComponent } from './containers/students/students.component';
import { StudentsRoutingModule } from './students-routing.module';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentListComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    AppMaterialModule,
    SharedModule
  ]
})
export class StudentsModule { }
