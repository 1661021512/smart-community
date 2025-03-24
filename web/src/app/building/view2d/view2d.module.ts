import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {View2dComponent} from './view2d.component';
import {ResidentsModule} from './residents/residents.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NationalitySelectModule} from '../../resident/nationality-select/nationality-select.module';
import {EducationSelectModule} from '../../resident/education-select/education-select.module';
import {PoliticalClimateSelectModule} from '../../resident/political-climate-select/political-climate-select.module';
import {View2dRoutingModule} from './view2d-routing.module';

/**
 * 查看居民
 */
@NgModule({
  declarations: [
    View2dComponent
  ],
  imports: [
    CommonModule,
    View2dRoutingModule,
    ResidentsModule,
    ReactiveFormsModule,
    NationalitySelectModule,
    EducationSelectModule,
    PoliticalClimateSelectModule
  ]
})
export class View2dModule {
}
