import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add.component';
import {ReactiveFormsModule} from "@angular/forms";
import {VillageShareModule} from "../../village/village-share.module";
import {MultiVillageSelectModule} from '../multi-village-select/multi-village-select.module';



@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VillageShareModule,
    MultiVillageSelectModule
  ],
  exports: [
    AddComponent
  ]
})
export class AddModule { }
