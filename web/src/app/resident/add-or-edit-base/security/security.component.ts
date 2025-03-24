import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Resident} from '../../../../../projects/lib/src/entity/resident';
import {Assert} from '@yunzhi/utils';
import {Subscription} from 'rxjs';
import {ResidentAddComponent} from '../../resident-add/resident-add.component';
import {CrimedType} from '../../../../../projects/lib/src/entity/crimed-type';

/**
 * 社会综治
 */
@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit, OnDestroy {
  @Input()
  formGroup: FormGroup;
  formKeys = ResidentAddComponent.keys;
  @Input()
  resident: Resident;
  subscriptions = [] as Subscription[];

  constructor() {
  }

  /**
   * 初始化时是否选中
   * @param number 类型
   */
  getCrimedTypeChecked(number: number) {
    let found = false;
    this.resident.crimedTypes.forEach(value => {
      if (value && (value.id === number)) {
        found = true;
      }
    })
    return found;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

  ngOnInit(): void {
    Assert.isDefined(this.resident, '未接收到的正确的居民信息');
    if (!Array.isArray(this.resident.crimedTypes)) {
      this.resident.crimedTypes = [];
    }
    this.subscriptions.push(
      this.formGroup.valueChanges.subscribe(() => {
        this.resident.beCrimed = this.formGroup.get(this.formKeys.beCrimed).value;
        this.resident.beLetterImitationPeople = this.formGroup.get(this.formKeys.beLetterImitationPeople).value;
        this.resident.letterImitationContent = this.formGroup.get(this.formKeys.letterImitationContent).value;
        this.resident.beCultMember = this.formGroup.get(this.formKeys.beCultMember).value;
        this.resident.religiousBelief = this.formGroup.get(this.formKeys.religiousBelief).value;
        this.resident.cult = this.formGroup.get(this.formKeys.cult).value;
      }));
  }

  /**
   * 选择矫正类型时执行
   * @param number 矫正类型值
   * @param checked 是否选中
   */
  onCrimedTypeChange(number: number, checked: boolean) {
    let index = -1;
    this.resident.crimedTypes.forEach((value, i) => {
      if (value.id === number) {
        index = i;
      }
    });

    if (checked && (index === -1)) {
      this.resident.crimedTypes.push({id: number} as CrimedType);
    } else if (!checked && (index !== -1)) {
      this.resident.crimedTypes.splice(index, 1);
    }
  }
}
