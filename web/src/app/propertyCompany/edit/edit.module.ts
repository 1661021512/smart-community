import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {VillageShareModule} from '../../village/village-share.module';
import {DateModule} from '../../share/component/date/date.module';
import {MultiVillageSelectModule} from '../multi-village-select/multi-village-select.module';



@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VillageShareModule,
    DateModule,
    MultiVillageSelectModule
  ],
  exports: [
    EditComponent
  ]
})
export class EditModule { }
