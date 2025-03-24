import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NationalitySelectComponent} from './nationality-select/nationality-select.component';
import {PoliticalClimateSelectComponent} from './political-climate-select/political-climate-select.component';
import {EducationSelectComponent} from './education-select/education-select.component';
import {NationalityPipe} from './pipe/nationality.pipe';
import {ReactiveFormsModule} from '@angular/forms';
import {MaritalStatusSelectComponent} from './marital-status-select/marital-status-select.component';
import {NationalitySelectModule} from './nationality-select/nationality-select.module';
import {PoliticalClimateSelectModule} from './political-climate-select/political-climate-select.module';
import {EducationSelectModule} from './education-select/education-select.module';
import {MaritalStatusSelectModule} from './marital-status-select/marital-status-select.module';
import {ResidentPipeModule} from './pipe/resident-pipe.module';
import {ResidentAutoCompleteComponent} from "./resident-auto-complete/resident-auto-complete.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {Select2Module} from "../share/select2/select2.module";
import {AutoCompleteModule} from "../share/component/auto-complete/auto-complete.module";

/**
 * 居民
 */
@NgModule({
  declarations: [ResidentAutoCompleteComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NationalitySelectModule,
        PoliticalClimateSelectModule,
        EducationSelectModule,
        MaritalStatusSelectModule,
        ResidentPipeModule,
        AutoCompleteModule,
    ],
  exports: [NationalitySelectComponent,
    PoliticalClimateSelectComponent,
    EducationSelectComponent,
    NationalityPipe,
    MaritalStatusSelectComponent,
    ResidentAutoCompleteComponent]
})
export class ResidentShareModule {
}
