import {NgModule} from '@angular/core';
import {ModelSelectComponent} from './model-select/model-select.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [ModelSelectComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ModelSelectComponent]
})
export class ThreeModelShareModule {
}

