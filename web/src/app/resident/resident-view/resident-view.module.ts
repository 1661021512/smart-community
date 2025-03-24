import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResidentPipeModule} from '../pipe/resident-pipe.module';
import {TrueOrFalseModule} from '../../share/true-or-false/true-or-false.module';
import {HousePlacePipeModule} from '../pipe/housePlace-pipe.module';
import {MaritalPipeModule} from '../pipe/marital/marital-pipe.module';
import {ResidentViewComponent} from './resident-view.component';
import {BackModule} from '../../share/component/back/back.module';
import {ResidentViewRoutingModule} from './resident-view-routing.module';
import {RelationshipMapModule} from '../relationship-map/relationship-map.module';


@NgModule({
  declarations: [
    ResidentViewComponent
  ],
  imports: [
    CommonModule,
    ResidentPipeModule,
    TrueOrFalseModule,
    HousePlacePipeModule,
    MaritalPipeModule,
    BackModule,
    RelationshipMapModule,
    ResidentViewRoutingModule
  ], exports: [
    ResidentViewComponent
  ]
})
export class ResidentViewModule {
}
