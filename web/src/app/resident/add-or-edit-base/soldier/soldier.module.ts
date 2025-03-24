import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SoldierComponent} from './soldier.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TrueOrFalseModule} from '../../../share/component/true-or-false/true-or-false.module';


@NgModule({
  declarations: [SoldierComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TrueOrFalseModule
  ],
  exports: [SoldierComponent]
})
export class SoldierModule {
}
