import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Relationship} from "../../../../../projects/lib/src/entity/relationship";
import {RelationshipService} from "../../../../../projects/lib/src/service/relationship.service";

/**
 * 居民关系选择组件 # 541
 * 1. 由后台获取所有的关系列表
 * 2. 按weight权重排序(由小到大)
 * 3. 在V层循环输出所有的关系
 * 4. 本组件不需要 请选择 提示
 * 5. 输入、输出为居民关系ID，类型number
 */
@Component({
  selector: 'app-relationship-select',
  templateUrl: './relationship-select.component.html',
  styleUrls: ['./relationship-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return RelationshipSelectComponent;
      })
    }
  ]
})
export class RelationshipSelectComponent implements OnInit, ControlValueAccessor {

  /**
   * 建立relationship数组
   */
  objects = new Array<Relationship>();

  showObjects = [] as Relationship[];

  /**
   * 用户主动或被动选择的选项
   */
  selected = new FormControl(null);

  constructor(private relationshipService: RelationshipService) {
  }

  ngOnInit(): void {
    this.relationshipService.getAll().subscribe(objects => {
      this.validate(objects);
      this.objects = objects;
      this.update();
    })
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

  public update() {
      this.showObjects = this.objects;
  }

  /**
   * 校验数据，必不可少
   * @param objects 居民关系数组
   */
  validate(objects: Relationship[]): void {

  }
}
