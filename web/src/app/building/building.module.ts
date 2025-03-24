import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './index/index.component';
import {EditComponent} from './edit/edit.component';
import {VillageShareModule} from '../village/village-share.module';
import {ReactiveFormsModule} from '@angular/forms';
import {BuildingRoutingModule} from './building-routing.module';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {RegionShareModule} from '../region/region-share.module';
import {AddModule} from './add/add.module';
import { BuildingTypePipe } from './building-type.pipe';
import {ValidatorClassModule} from "../share/directive/validator-class/validator-class.module";


/**
 * 住宅楼管理
 */
@NgModule({
  declarations: [
    IndexComponent,
    EditComponent,
    BuildingTypePipe
  ],
    imports: [
        AddModule,
        CommonModule,
        ReactiveFormsModule,
        VillageShareModule,
        YzPageModule,
        YzSizeModule,
        BuildingRoutingModule,
        RegionShareModule,
        ValidatorClassModule
    ]
})
export class BuildingModule {
}
