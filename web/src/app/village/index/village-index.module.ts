import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VillageIndexComponent} from './village-index.component';
import {CommunityShareModule} from '../../community/community-share.module';
import {TownShareModule} from '../../town/town-share.module';
import {ReactiveFormsModule} from '@angular/forms';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {RouterModule} from '@angular/router';
import {VillageTypeModule} from '../village-type.module';


@NgModule({
  declarations: [VillageIndexComponent],
  imports: [
    CommonModule,
    CommunityShareModule,
    TownShareModule,
    ReactiveFormsModule,
    RouterModule,
    YzPageModule,
    YzSizeModule,
    VillageTypeModule,
  ],
  exports: [VillageIndexComponent]
})
export class VillageIndexModule {
}
