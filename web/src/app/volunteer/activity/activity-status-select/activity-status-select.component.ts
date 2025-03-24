import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {StatusEnum} from '../../../../../projects/lib/src/entity/enum/statusEnum';
import {Activity_Status, ActivityStatus} from '../../../../../projects/lib/src/entity/enum/activity-status';

/**
 * 活动状态选择组件
 * Author zhangrui
 */
@Component({
  selector: 'app-activity-status-select',
  templateUrl: './activity-status-select.component.html',
  styleUrls: ['./activity-status-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return ActivityStatusSelectComponent;
      })
    }]
})
export class ActivityStatusSelectComponent implements OnInit, ControlValueAccessor {

  activityStatusSelected = new FormControl(null);
  activityStatuses = [] as {
    id: number,
    name: string
  }[];
  /**
   * 是否显示 请选择
   */
  state = {
    showPleaseSelect: true
  }

  constructor() {
  }

  @Input()
  set isShowPleaseSelect(isShowPleaseSelect: boolean) {
    this.state.showPleaseSelect = isShowPleaseSelect;
  }

  ngOnInit(): void {
    for (let key in Activity_Status) {
      const value = Activity_Status[key] as StatusEnum<ActivityStatus>
      this.activityStatuses.push(
        {
          id: value.value,
          name: value.description
        }
      );
    }
  }


  registerOnChange(fn: (data: number) => void): void {
    this.activityStatusSelected.valueChanges
      .subscribe((data: number) => {
        fn(data);
      });
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: number): void {
    this.activityStatusSelected.setValue(obj);
  }
}
