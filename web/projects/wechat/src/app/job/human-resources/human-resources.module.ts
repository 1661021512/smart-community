import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {ContentDetailModule} from '../../content/content-detail/content-detail.module';
import {HumanResourcesComponent} from './human-resources.component';
import {HumanResourcesRoutingModule} from './human-resources-routing.module';

/**
 * 人力资源公司
 */
@NgModule({
  declarations: [HumanResourcesComponent],
  imports: [
    CommonModule,
    IonicModule,
    ContentDetailModule,
    HumanResourcesRoutingModule
  ],
  exports: [
    HumanResourcesComponent
  ]
})
export class HumanResourcesModule {
}
