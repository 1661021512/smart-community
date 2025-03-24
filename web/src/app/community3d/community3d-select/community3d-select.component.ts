import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Community3d} from "../../../../projects/lib/src/entity/community3d";
import {Community3dService} from "../../../../projects/lib/src/service/community3d.service";

/**
 * 社区3D模型选择
 */
@Component({
  selector: 'app-community3d-select',
  templateUrl: './community3d-select.component.html',
  styleUrls: ['./community3d-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return Community3dSelectComponent;
      })
    }]
})
export class Community3dSelectComponent implements OnInit, ControlValueAccessor {

  /**
   * 所有社区3D模型
   */
  community3ds = new Array<Community3d>();

  /**
   * 用户主动选择或是由父组件传入后被动选择的模型
   */
  community3dSelected = new FormControl(null);

  /**
   * 是否显示 请选择
   */
  @Input()
  isShowPleaseSelect = true;

  constructor(private community3dService: Community3dService) {
  }

  ngOnInit(): void {
    this.community3dService.getAll().subscribe(community3ds => {
      this.community3ds = community3ds;
    })
  }

  /**
   * 组件需要向父组件弹值时，直接调用参数中的fn方法
   * 相当于@Output()
   * @param fn 此类型取决于当前组件的弹出值类型，如当前弹出一个类型为number的id
   */
  registerOnChange(fn: (data: number) => void): void {
    this.community3dSelected.valueChanges
      .subscribe((data: number) => {
        fn(data);
      });
  }

  /**
   * 将FormControl中的值通过此方法写入
   * FormControl的值每变化一次，该方法被重新执行一次
   * 相当于@Input() set xxx
   * @param obj 此类型取决于当前组建的接收类型，如我们接受一个类型为number的id
   */
  writeValue(obj: number): void {
    this.community3dSelected.setValue(obj);
  }

  registerOnTouched(fn: any): void {
  }
}
