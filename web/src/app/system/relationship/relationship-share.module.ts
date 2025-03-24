import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RelationshipSelectComponent} from './relationship-select/relationship-select.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    RelationshipSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    RelationshipSelectComponent
  ]
})
export class RelationshipShareModule {
}
