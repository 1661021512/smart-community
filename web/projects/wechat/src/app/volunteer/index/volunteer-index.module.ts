import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {VolunteerIndexComponent} from "./volunteer-index.component";
import {IntDateToTimestampModule} from '../../../../../lib/src/lib/int-date-to-timestamp/int-date-to-timestamp.module';
import {ImageUrlModule} from '../../../../../lib/src/lib/image/image-url/image-url.module';
import {VolunteerIndexRoutingModule} from './volunteer-index-routing.module';

/**
 * 志愿者首页
 */

@NgModule({
  declarations: [VolunteerIndexComponent],
  imports: [
    CommonModule,
    IonicModule,
    IntDateToTimestampModule,
    ImageUrlModule,
    VolunteerIndexRoutingModule
  ],
  exports:[
    VolunteerIndexComponent
  ]
})
export class VolunteerIndexModule { }
