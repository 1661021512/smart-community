import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PoliticalClimatePipe} from './political-climate.pipe';
import {NationalityPipe} from './nationality.pipe';
import {EducationPipe} from './education.pipe';
import {HousePipe} from './house.pipe';
import {SexPipe} from './sex.pipe';
import {IdSexPipe} from './id-sex.pipe';
import {IdBirthdayPipe} from './id-birthday.pipe';
import {IdAgePipe} from './id-age.pipe';
import {RelationshipPipeModule} from './relationship-pipe.module';
import {MaritalPipeModule} from './marital/marital-pipe.module';
import {OwnedPipe} from "../../house/owned.pipe";

@NgModule({
  declarations: [PoliticalClimatePipe,
    NationalityPipe,
    EducationPipe,
    HousePipe,
    SexPipe,
    IdSexPipe,
    IdBirthdayPipe,
    IdAgePipe,
    ],
  imports: [
    CommonModule,
    RelationshipPipeModule,
    MaritalPipeModule
  ], exports: [
    PoliticalClimatePipe,
    NationalityPipe,
    EducationPipe,
    SexPipe,
    IdSexPipe,
    IdAgePipe,
    IdBirthdayPipe,
  ]
})
export class ResidentPipeModule {
}
