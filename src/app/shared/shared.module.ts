import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ErrorDialogComponent,
    ConfirmationDialogComponent,
    SearchFilterComponent
  ],
  imports: [
    AppMaterialModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports:[
    ErrorDialogComponent,
    ConfirmationDialogComponent,
    SearchFilterComponent
  ]
})
export class SharedModule { }
