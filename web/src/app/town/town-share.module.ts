import {NgModule} from '@angular/core';
import {TownSelectComponent} from './town-select/town-select.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [TownSelectComponent],
  imports: [CommonModule,
    ReactiveFormsModule],
  exports: [TownSelectComponent]
})
export class TownShareModule {
}
