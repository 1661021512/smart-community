import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Activity_Scale, ActivityScale} from '../../../../../projects/lib/src/entity/enum/activity-scale';
import {StatusEnum} from '../../../../../projects/lib/src/entity/enum/statusEnum';

/**
 * 活动规模选择组件
 * Author zhangrui
 */
@Component({
  selector: 'app-activity-scale-select',
  templateUrl: './activity-scale-select.component.html',
  styleUrls: ['./activity-scale-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return ActivityScaleSelectComponent;
      })
    }]
})
export class ActivityScaleSelectComponent implements OnInit, ControlValueAccessor {

  constructor() { }

  activityScales = [] as {
    id: number,
    name: string
  }[];

  activityScaleSelected = new FormControl(null);

  /**
   * 是否显示 请选择
   */
  state = {
    showPleaseSelect : true
  }

  @Input()
  set isShowPleaseSelect(isShowPleaseSelect: boolean) {
    this.state.showPleaseSelect = isShowPleaseSelect;
  }

  ngOnInit(): void {
    for (let key in Activity_Scale){
      const value = Activity_Scale[key] as StatusEnum<ActivityScale>
      this.activityScales.push(
        {
          id: value.value,
          name: value.description
        }
      );
    }
  }

  registerOnChange(fn: (data: number) => void): void {
    this.activityScaleSelected.valueChanges
      .subscribe((data: number) => {
        fn(data);
      });
  }

  writeValue(obj: number): void {
    this.activityScaleSelected.setValue(obj);
  }

  registerOnTouched(fn: any): void {
  }
}
