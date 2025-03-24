import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentComponent} from './student.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TrueOrFalseModule} from '../../../share/component/true-or-false/true-or-false.module';
import {ValidatorClassModule} from '../../../share/directive/validator-class/validator-class.module';


@NgModule({
  declarations: [StudentComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TrueOrFalseModule,
    ValidatorClassModule
  ],
  exports: [StudentComponent]
})
export class StudentModule {
}
