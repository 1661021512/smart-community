import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommunityRoutingModule} from './community-routing.module';
import {CommunityComponent} from './community.component';
import {ResidentPipChartComponent} from './resident-pip-chart/resident-pip-chart.component';
import {PopulationClassificationComponent} from './population-classification/population-classification.component';
import {OldPeoplePipChartComponent} from './old-people-pip-chart/old-people-pip-chart.component';
import {PropertyHomeChartComponent} from './property-home-chart/property-home-chart.component';
import {CommunityWorkChartComponent} from './community-work-chart/community-work-chart.component';
import {RealPictureComponent} from './real-picture/real-picture.component';
import {EmploymentStatusChartComponent} from './employment-status-chart/employment-status-chart.component';
import {GridMemberComponent} from './grid-member/grid-member.component';
import {GridMemberAddComponent} from './grid-member-add/grid-member-add.component';
import {GridMemberAddStep1Component} from './grid-member-add-step1/grid-member-add-step1.component';
import {IndexComponent} from './index/index.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashboardShareModule} from '../dashboard/dashboard-share.module';
import {TownShareModule} from '../town/town-share.module';
import {CommunityShareModule} from './community-share.module';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {ValidatorClassModule} from '../share/directive/validator-class/validator-class.module';
import {UploaderModule} from '../attachment/uploader/uploader.module';
import {AddModule} from './add/add.module';
import {EditModule} from './edit/edit.module';

/**
 * 社区管理
 */
@NgModule({
  declarations: [
    CommunityComponent,
    ResidentPipChartComponent,
    PopulationClassificationComponent,
    OldPeoplePipChartComponent,
    PropertyHomeChartComponent,
    CommunityWorkChartComponent,
    RealPictureComponent,
    EmploymentStatusChartComponent,
    GridMemberComponent,
    GridMemberAddComponent,
    GridMemberAddStep1Component,
    IndexComponent
  ],
  exports: [CommunityComponent],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    CommunityShareModule,
    DashboardShareModule,
    FormsModule,
    TownShareModule,
    ReactiveFormsModule,
    YzSizeModule,
    YzPageModule,
    ValidatorClassModule,
    UploaderModule,
    AddModule,
    EditModule
  ]
})
export class CommunityModule {
}
