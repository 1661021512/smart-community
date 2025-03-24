import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Select2Component} from './select2.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {ReactiveFormsModule} from '@angular/forms';
import {SELECT2_SERVICE_TOKEN} from './select2.service';
import {Select2IdService} from './select2-id.service';
import {Select2ObjectService} from './select2-object.service';

/**
 * select2
 * @author panjie
 */
@NgModule({
  declarations: [
    Select2Component
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: SELECT2_SERVICE_TOKEN, multi: true,
    useClass: Select2IdService
  }, {
    provide: SELECT2_SERVICE_TOKEN, multi: true,
    useClass: Select2ObjectService
  }],
  exports: [Select2Component]
})
export class Select2Module {
}
