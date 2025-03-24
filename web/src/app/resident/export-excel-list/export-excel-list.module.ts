import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportExcelListComponent } from './export-excel-list.component';



@NgModule({
  declarations: [
    ExportExcelListComponent
  ],
  exports: [
    ExportExcelListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ExportExcelListModule { }
