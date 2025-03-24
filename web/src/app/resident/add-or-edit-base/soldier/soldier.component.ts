import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Resident} from '../../../../../projects/lib/src/entity/resident';
import {Assert} from '@yunzhi/utils';
import {Subscription} from 'rxjs';
import {ResidentAddComponent} from '../../resident-add/resident-add.component';

/**
 * 复原军人
 */
@Component({
  selector: 'app-soldier',
  templateUrl: './soldier.component.html',
  styleUrls: ['./soldier.component.scss']
})
export class SoldierComponent implements OnInit, OnDestroy {
  @Input()
  formGroup: FormGroup;
  formKeys = ResidentAddComponent.keys;
  @Input()
  resident: Resident;

  subscriptions = [] as Subscription[];

  constructor() {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

  ngOnInit(): void {
    Assert.isDefined(this.resident, '未传入居民信息');
    this.subscriptions.push(
      this.formGroup.valueChanges.subscribe(() => {
        this.resident.beSoldier = this.formGroup.get(this.formKeys.beSoldier).value;
        this.resident.beEnterToWar = this.formGroup.get(this.formKeys.beEnterToWar).value;
        this.resident.beVolunteer = this.formGroup.get(this.formKeys.beVolunteer).value;
        this.resident.beNuclear = this.formGroup.get(this.formKeys.beNuclear).value;
        this.resident.beDisabledSolider = this.formGroup.get(this.formKeys.beDisabledSolider).value;
      }));
  }
}
