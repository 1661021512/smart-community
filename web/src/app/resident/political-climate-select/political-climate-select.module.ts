import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PoliticalClimateSelectComponent} from './political-climate-select.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [PoliticalClimateSelectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ], exports: [PoliticalClimateSelectComponent]
})
export class PoliticalClimateSelectModule {
}
