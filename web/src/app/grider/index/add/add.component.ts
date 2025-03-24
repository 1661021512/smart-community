import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {User} from 'projects/lib/src/entity/user';
import {CommonService} from 'projects/lib/src/service/common.service';
import {CommunityService} from 'projects/lib/src/service/community.service';
import {WebUserService} from 'src/service/web-user.service';
import {YzAsyncValidators} from 'projects/lib/src/validator/yz-async-validators';
import {YzValidators} from 'projects/lib/src/validator/yz-validators';
import {GriderService} from 'projects/lib/src/service/grider.service';
import {District} from 'projects/lib/src/entity/district';
import {DISTRICT_TYPE} from 'projects/lib/src/entity/enum/district-type';
import {Assert} from '@yunzhi/utils';
import {DistrictService} from 'projects/lib/src/service/district.service';
import {Grider} from 'projects/lib/src/entity/grider';
import {Community} from 'projects/lib/src/entity/community';

/**
 * 添加网格员
 */
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  district = {} as District;
  formGroup = new FormGroup({});
  /**
   * form表单关键字
   */
  formKeys = {
    name: 'name',
    username: 'username',
    communityId: 'communityId'
  };
  user = {} as User;

  constructor(private commonService: CommonService,
              private route: ActivatedRoute,
              private yzAsyncValidators: YzAsyncValidators,
              private communityService: CommunityService,
              private griderService: GriderService,
              private districtService: DistrictService,
              private userService: WebUserService) {
  }

  /**
   * 仅保留类型为社区的区域
   * @param district 区域
   */
  districtFilter = (district: District) => {
    return district.type === DISTRICT_TYPE.community.value
  }

  ngOnInit(): void {
    this.userService.currentLoginUser$.subscribe(user => {
      if (user !== null) {
        Assert.isNotNullOrUndefined(user.district, '未获取到用户区域信息');
        this.district.id = user.district.id;
      }
    });
    // 验证用户输入
    const formControlUsername = new FormControl('',
      [Validators.required, YzValidators.isChinaMobileNumber], this.yzAsyncValidators.griderNotExist());
    this.subscribeUsernameChange(formControlUsername);
    this.formGroup.addControl(this.formKeys.username, formControlUsername);
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.communityId, new FormControl(null, Validators.required));
  }

  /**
   * 保存提交功能
   * @param formGroup 待保存的数据
   */
  onSubmit(formGroup: FormGroup) {
    const grider = {
      webUser: {
        username: this.formGroup.get(this.formKeys.username).value as string,
        name: this.formGroup.get(this.formKeys.name).value as string,
      },
      community: {
        id: this.formGroup.get(this.formKeys.communityId).value
      } as Community
    } as Grider;
    this.griderService.save(grider).subscribe(
      () => {
        this.commonService.success(() => this.commonService.back());
      }, error => console.log('保存失败', error));
  }

  setUser(user: User): void {
    this.user = user;
    const nameFormControl = this.formGroup.get(this.formKeys.name) as FormControl;
    if (this.user.id) {
      nameFormControl.disable();
      nameFormControl.setValue(user.name);
    } else {
      nameFormControl.enable();
      nameFormControl.setValue('');
    }
  }

  /**
   * 自动添加已存在用户，则添加到输入框，不存在则没有任何操作
   * @param usernameFormControl
   */
  subscribeUsernameChange(usernameFormControl): void {
    usernameFormControl.valueChanges.subscribe(value => {
      if (usernameFormControl.valid || this.formGroup.get(this.formKeys.username).errors === null) {
        // 向后台发起请求,验证用户是否存在
        this.userService.existByUsername(value)
          .subscribe(user => {
            if (user) {
              this.commonService.confirm((confirm) => {
                if (confirm) {
                  usernameFormControl.setValue(value, {emitEvent: false})
                  this.userService.getByUsername(this.formGroup.get(this.formKeys.username).value as string)
                    .subscribe(user => {
                      this.setUser(user);
                      this.formGroup.get(this.formKeys.name).setValue(user.name);
                    })
                } else {
                  usernameFormControl.setValue('', {emitEvent: false})
                }
              }, '已存在该手机的用户，是否确认添加');
            } else {
              console.log('user不存在');
            }
          });
      } else {
        this.setUser({} as User);
      }
    });
  }
}
