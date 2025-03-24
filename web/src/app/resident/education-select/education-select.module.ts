import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EducationSelectComponent} from './education-select.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [EducationSelectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [EducationSelectComponent]
})
export class EducationSelectModule {
}
