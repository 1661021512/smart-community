import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {VillageSelectComponent} from './village-select/village-select.component';
import {NgSelectModule} from '@ng-select/ng-select';


@NgModule({
  declarations: [
    VillageSelectComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule
  ],
  exports: [VillageSelectComponent]
})
export class VillageShareModule {
}
