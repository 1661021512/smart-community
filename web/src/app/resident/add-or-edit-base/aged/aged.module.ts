import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgedComponent} from './aged.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TrueOrFalseModule} from '../../../share/component/true-or-false/true-or-false.module';
import {ValidatorClassModule} from '../../../share/directive/validator-class/validator-class.module';


@NgModule({
  declarations: [AgedComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TrueOrFalseModule,
    ValidatorClassModule
  ],
  exports: [AgedComponent]
})
export class AgedModule {
}
