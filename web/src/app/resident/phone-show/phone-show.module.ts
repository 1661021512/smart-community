import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneShowComponent } from './phone-show.component';



@NgModule({
  declarations: [
    PhoneShowComponent
  ],
  exports: [
    PhoneShowComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PhoneShowModule { }
