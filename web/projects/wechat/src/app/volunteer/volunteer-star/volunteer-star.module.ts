import {NgModule} from '@angular/core';
import {VolunteerStarComponent} from './volunteer-star.component';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {VolunteerStarRoutingModule} from './volunteer-star-routing.module';

/**
 * 志愿者服务明星
 */
@NgModule({
  declarations: [VolunteerStarComponent],
  imports:[
    CommonModule,
    IonicModule,
    VolunteerStarRoutingModule
  ],
  exports:[
    VolunteerStarComponent
  ]
})
export class VolunteerStarModule {
}
