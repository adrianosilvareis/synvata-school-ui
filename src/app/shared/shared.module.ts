import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiselectChipsComponent } from './components/multiselect-chips/multiselect-chips.component';



@NgModule({
  declarations: [
    ErrorDialogComponent,
    ConfirmationDialogComponent,
    SearchFilterComponent,
    MultiselectChipsComponent
  ],
  imports: [
    AppMaterialModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports:[
    ErrorDialogComponent,
    ConfirmationDialogComponent,
    SearchFilterComponent,
    MultiselectChipsComponent
  ]
})
export class SharedModule { }
