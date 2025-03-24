import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {House} from '../../../../../projects/lib/src/entity/house';
import {Assert} from '@yunzhi/utils';
import {Observable} from 'rxjs';

/**
 * 编辑住房的信息
 * @author panjie
 */
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Input()
  change$: Observable<void>;
  @Output()
  doEdit = new EventEmitter<House>();
  @Input()
  house: House;
  private name = 'EditComponent: ';

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    Assert.isObject(this.house, this.change$, this.name + 'some properties must be object');
    Assert.isNotNullOrUndefined(this.house.name, this.name + 'some properties must be passed');
    this.change$.subscribe(() => this.changeDetectorRef.detectChanges());
  }

  onEdit(house: House) {
    this.doEdit.emit(house);
  }
}
