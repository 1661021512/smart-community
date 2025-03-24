import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './index.component';
import {RegionShareModule} from '../../region/region-share.module';
import {ResidentShareModule} from '../resident-share.module';
import {ReactiveFormsModule} from '@angular/forms';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {ResidentPipeModule} from '../pipe/resident-pipe.module';
import {RegionSelectOfCurrentUserModule} from '../../region/region-select-of-current-user/region-select-of-current-user.module';
import {HousePlacePipeModule} from '../pipe/housePlace-pipe.module';
import {IdNumberShowModule} from '../id-number-show/id-number-show.module';
import {PhoneShowModule} from '../phone-show/phone-show.module';
import {RouterModule} from '@angular/router';
import {ExportExcelListModule} from '../export-excel-list/export-excel-list.module';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    RegionShareModule,
    ResidentShareModule,
    ReactiveFormsModule,
    YzPageModule,
    YzSizeModule,
    HousePlacePipeModule,
    ResidentPipeModule,
    RegionSelectOfCurrentUserModule,
    IdNumberShowModule,
    PhoneShowModule,
    RouterModule,
    ExportExcelListModule
  ],
  exports: [IndexComponent]
})
export class IndexModule {
}
