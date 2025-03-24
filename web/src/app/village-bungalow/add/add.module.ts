import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddComponent} from './add.component';
import {VillageAddModule} from '../../village/add/village-add.module';


@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    VillageAddModule
  ],
  exports: [
    AddComponent
  ]
})
export class AddModule {
}
