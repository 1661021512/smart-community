import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Resident} from '../../../../../projects/lib/src/entity/resident';
import {Assert} from '@yunzhi/utils';
import {ResidentAddComponent} from '../../resident-add/resident-add.component';
import {Subscription} from 'rxjs';

/**
 * 就业情况
 */
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit, OnDestroy {
  @Input()
  formGroup: FormGroup;
  formKeys = ResidentAddComponent.keys;
  @Input()
  resident: Resident;
  subscriptions = [] as Subscription[];

  constructor() {
  }

  ngOnInit(): void {
    this.validate(this.resident);
    this.subscriptions.push(
      this.formGroup.valueChanges.subscribe(() => {
        this.resident.workPlace = this.formGroup.get(this.formKeys.workPlace).value;
        this.resident.employmentStatus = this.formGroup.get(this.formKeys.employmentStatus).value;
        this.resident.enterprise = this.formGroup.get(this.formKeys.enterprise).value;
        this.resident.jobTypeRequirements = this.formGroup.get(this.formKeys.jobTypeRequirements).value;
        this.resident.skills = this.formGroup.get(this.formKeys.skills).value;
      }));
  }

  validate(resident: Resident) {
    console.log(resident);
    Assert.isDefined(resident, '未接收到的正确的居民信息');
    Assert.isDefined(resident.workPlace, resident.enterprise, '基本数据校验错误');
    Assert.isArray(resident.jobTypeRequirements, resident.skills, '数组格式校验错误');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }
}
