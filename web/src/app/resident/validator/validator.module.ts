import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VaccinatedDirective } from './vaccinated-validator';



@NgModule({
  declarations: [
    VaccinatedDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ValidatorModule { }
