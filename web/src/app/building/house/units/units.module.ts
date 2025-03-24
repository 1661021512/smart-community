import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UnitsComponent} from './units.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {UnitModule} from './unit/unit.module';


@NgModule({
  declarations: [UnitsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    UnitModule
  ],
  exports: [UnitsComponent]
})
export class UnitsModule {
}
