import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms'
import {StatusEnum} from '../../../../../projects/lib/src/entity/enum/statusEnum'
import {WelfareJob_PostType, WelfareJobPostType} from '../../../../../projects/lib/src/entity/enum/welfareJob-postType'

/**
 * 就业服务-公益性岗位-类型选择组件
 * Author: Wang-Haodong
 */
@Component({
  selector: 'app-welfare-job-post-type-select',
  templateUrl: './welfare-job-post-type-select.component.html',
  styleUrls: ['./welfare-job-post-type-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return WelfareJobPostTypeSelectComponent;
      })
    }]
})
export class WelfareJobPostTypeSelectComponent implements OnInit, ControlValueAccessor {

  constructor() {
  }

  welfareJobPostTypes = [] as {
    id: number,
    name: string
  }[];

  welfareJobPostTypeSelected = new FormControl(null);

  /**
   * 是否显示 请选择
   */
  state = {
    showPleaseSelect: true
  }

  @Input()
  set isShowPleaseSelect(isShowPleaseSelect: boolean) {
    this.state.showPleaseSelect = isShowPleaseSelect;
  }

  ngOnInit(): void {
    for (let key in WelfareJob_PostType) {
      const value = WelfareJob_PostType[key] as StatusEnum<WelfareJobPostType>
      this.welfareJobPostTypes.push(
        {
          id: value.value,
          name: value.description
        }
      );
    }
  }

  registerOnChange(fn: (data: number) => void): void {
    this.welfareJobPostTypeSelected.valueChanges
      .subscribe((data: number) => {
        fn(data);
      });
  }

  writeValue(obj: number): void {
    this.welfareJobPostTypeSelected.setValue(obj);
  }

  registerOnTouched(fn: any): void {
  }

}
