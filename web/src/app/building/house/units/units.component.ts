import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Unit} from '../../../../../projects/lib/src/entity/unit';

/**
 * 单元管理
 * @author panjie
 */
@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent {
  activeIndex = -1;
  @Output()
  doHousesChange = new EventEmitter<void>();
  state = {
    units: new Array<Unit>()
  }

  constructor() {
  }

  get units() {
    return this.state.units;
  }

  @Input()
  set units(units: Array<Unit>) {
    if (this.activeIndex === -1 && units.length > 0) {
      this.activeIndex = 0;
    } else if (units.length === 0) {
      this.activeIndex = -1;
    } else if (units.length < this.activeIndex) {
      this.activeIndex = 0;
    }
    this.state.units = units;
  }

  onActive(i: number): void {
    this.activeIndex = i;
  }

  isActive(i: number) {
    return i === this.activeIndex;
  }

  onHousesChange() {
    this.doHousesChange.emit(null);
  }
}
