import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditComponent} from './edit.component';
import {YzModalModule} from '@yunzhi/ng-common';
import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    YzModalModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [EditComponent]
})
export class EditModule {
}
