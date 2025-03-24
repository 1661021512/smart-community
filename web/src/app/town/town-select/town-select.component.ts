import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Town} from '../../../../projects/lib/src/entity/town';
import {TownService} from '../../../../projects/lib/src/service/town.service';

/**
 * 乡镇选择
 */
@Component({
  selector: 'app-town-select',
  templateUrl: './town-select.component.html',
  styleUrls: ['./town-select.component.scss'],
    providers: [
      {
        provide: NG_VALUE_ACCESSOR, multi: true,
        useExisting: forwardRef(() => {
          return TownSelectComponent;
        })
      }]
  })
export class TownSelectComponent implements OnInit, ControlValueAccessor {
  /**
   * 所有乡镇
   */
  towns = new Array<Town>();

  /**
   * 用户主动选择或是由父组件传入后被动选择的乡镇
   */
  townSelected = new FormControl(null);

  /**
   * 是否显示 请选择
   */
  isShowPleaseSelect = true;

  @Input()
  set showAllTown(isShowAllTown: boolean) {
    this.isShowPleaseSelect = isShowAllTown;
  }

  constructor(private townService: TownService) {
  }

  ngOnInit(): void {
    this.townService.getAll().subscribe(towns => {
      this.towns = towns;
    })
  }

  /**
   * 组件需要向父组件弹值时，直接调用参数中的fn方法
   * 相当于@Output()
   * @param fn 此类型取决于当前组件的弹出值类型，比如我们当前将弹出一个类型为number的teacherId
   */
  registerOnChange(fn: (data: number) => void): void {
    this.townSelected.valueChanges
      .subscribe((data: number) => {
        fn(data);
      });
  }

  /**
   * 将FormControl中的值通过此方法写入
   * FormControl的值每变换一次，该方法将被重新执行一次
   * 相当于@Input() set xxx
   * @param obj 此类型取决于当前组件的接收类型，比如此时我们接收一个类型为number的teacherId
   */
  writeValue(obj: number): void {
    this.townSelected.setValue(obj);
  }

  registerOnTouched(fn: any): void {
  }

}
