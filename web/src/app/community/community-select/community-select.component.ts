import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Community} from '../../../../projects/lib/src/entity/community';
import {CommunityService} from '../../../../projects/lib/src/service/community.service';
import {Assert} from '@yunzhi/ng-mock-api';

@Component({
  selector: 'app-community-select',
  templateUrl: './community-select.component.html',
  styleUrls: ['./community-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return CommunitySelectComponent;
      })
    }]
})
export class CommunitySelectComponent implements OnInit, ControlValueAccessor {
  state = {
    townId: null as number
  }

  /**
   * 建立community数组
   */
  objects = new Array<Community>();

  /**
   * 用户主动或被动选择的选项
   */
  selected = new FormControl(null);

  /**
   * 时候显示 "请选择"
   */
  isShowPleaseSelect = true;

  constructor(private communityService: CommunityService) {
  }

  @Input()
  set showAll(isShowAll: boolean) {
    this.isShowPleaseSelect = isShowAll;
  }

  @Input()
  set townId(townId: number) {
    if (Number.isInteger(townId)) {
      this.communityService.getByTownId(townId)
        .subscribe(objects => {
          this.objects = objects;
        })
    } else {
      this.objects = [];
    }
  }

  ngOnInit(): void {
    return
  }

  /**
   * 组件需要向父组件弹值时，直接调用参数中的fn方法
   * 相当于@Output()
   * @param fn 此类型取决于当前组件的弹出值类型，比如我们当前将弹出一个类型为number的teacherId
   */
  registerOnChange(fn: (data: number) => void): void {
    this.selected.valueChanges
      .subscribe((data: number) => {
        fn(data);
      });
  }


  registerOnTouched(fn: any): void {
  }

  /**
   * 将FormControl中的值通过此方法写入
   * FormControl的值每变换一次，该方法将被重新执行一次
   * 相当于@Input() set xxx
   * @param obj 此类型取决于当前组件的接收类型，比如此时我们接收一个类型为number的teacherId
   */
  writeValue(obj: number): void {
    this.selected.setValue(obj);
  }

  /**
   * 校验数据，必不可少
   * @param objects 社区数组
   */
  validate(objects: Community[]): void {

  }
}
