import {Component, OnDestroy, OnInit} from '@angular/core';
import {District} from '../../../../projects/lib/src/entity/district';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PartyBuilding} from '../../../../projects/lib/src/entity/partyBuilding';
import {Duty} from '../../../../projects/lib/src/entity/duty';
import {Subscription} from 'rxjs';
import {User} from '../../../../projects/lib/src/entity/user';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {PartyBuildingService} from '../../../../projects/lib/src/service/party-building.service';
import {ActivatedRoute} from '@angular/router';
import {YzAsyncValidators} from '../../../../projects/lib/src/validator/yz-async-validators';
import {DutyService} from '../../../../projects/lib/src/service/duty.service';
import {Assert} from '@yunzhi/utils';
import {WebUserService} from '../../../service/web-user.service';

/**
 * #841
 */
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {

  district = {} as District;
  formGroup = new FormGroup({});
  /**
   * form表单关键字
   */
  formKeys = {
    name: 'name'
  };
  // 定义参数
  params = {
    dutyId: undefined as number,
    districtId: undefined as number
  }
  post = {} as Duty;
  subscriptions = [] as Subscription[];
  user = {} as User;

  constructor(private commonService: CommonService,
              private partBuildingService: PartyBuildingService,
              private route: ActivatedRoute,
              private yzAsyncValidators: YzAsyncValidators,
              private postService: DutyService,
              private userService: WebUserService
  ) {
  }

  ngOnInit(): void {
    this.initFormGroup();
    this.subscribeRoute();
    this.userService.currentLoginUser$.subscribe(user => {
      if (user) {
        this.district = user.district;
      }
    });
  }

  initFormGroup() {
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
  }

  onSubmit(formGroup: FormGroup) {
    const partBuilding = {
      duty: {id: this.params.dutyId},
      personName: formGroup.get(this.formKeys.name).value as string
    } as PartyBuilding;
    console.log(partBuilding);
    this.partBuildingService.saveOfCurrentDistrict(partBuilding).subscribe(
      () => {
        this.commonService.success(() => this.commonService.back());
      });
  }

  setDuty(post: Duty): void {
    Assert.isDefined(post.name, '职务名称未获取到');
    this.post = post;
  }

  subscribeRoute() {
    this.route.params.subscribe((params: {dutyId?: number}) => {
      Assert.isInteger(+params.dutyId, '未接收到职位信息');
      this.params.dutyId = +params.dutyId;
      this.postService.getById(this.params.dutyId).subscribe((duty) => {
        this.setDuty(duty);
      });
    })
  }

  /**
   * 验证内部逻辑的
   * @param partBuilding
   */
  validate(partBuilding: PartyBuilding): void {
    Assert.isDefined(partBuilding, self.name + 'partBuilding must be defined');
    Assert.isDefined(partBuilding.district, partBuilding.duty, self.name + ' user validate fail');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }
}
