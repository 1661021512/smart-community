import {NgModule} from '@angular/core';
import {CommunitySelectComponent} from './community-select/community-select.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [CommunitySelectComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CommunitySelectComponent]
})
export class CommunityShareModule {
}
