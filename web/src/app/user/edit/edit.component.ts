import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {WebUserService} from '../../../service/web-user.service';
import {ActivatedRoute} from '@angular/router';
import {Assert} from '@yunzhi/ng-mock-api';
import {User} from '../../../../projects/lib/src/entity/user';
import {Role} from '../../../../projects/lib/src/entity/role';
import {YzValidators} from '../../../../projects/lib/src/validator/yz-validators';
import {DISTRICT_TYPE} from '../../../../projects/lib/src/entity/enum/district-type';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  districtCommunityType = DISTRICT_TYPE.community.value;
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    roles: new FormControl([] as number[], YzValidators.arrayMinLength(1)),
    region: new FormControl(null, Validators.required)
  })
  /**
   * form表单关键字
   */
  formKeys = {
    name: 'name',
    username: 'username',
    roles: 'roles',
    region: 'region'
  };
  user = new User;

  constructor(private commonService: CommonService,
              private userService: WebUserService,
              private route: ActivatedRoute) {
  }

  loadById(id: number): void {
    this.userService.getById(id)
      .subscribe((user: User) => {
        this.setUser(user);
      }, error => {
        throw new Error(error);
      })
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const id = +param.id;
      this.user.id = id;
      Assert.isTrue(Number.isInteger(id), 'ID类型不正确');
      this.loadById(id);
    })
  }

  onSubmit(formGroup: FormGroup) {
    this.userService.update(this.user.id, {
      name: formGroup.get(this.formKeys.name).value as string,
      username: formGroup.get(this.formKeys.username).value as string,
      roles: (formGroup.get(this.formKeys.roles).value as number[]).map(
        id => {
          return {id} as Role
        }),
      district: {
        id: formGroup.get(this.formKeys.region).value as number
      }
    }).subscribe(() => {
      },
      () => {
      },
      () => {
        this.commonService.success(() => {
          this.commonService.back()
        });
      });
  }

  setUser(user: User): void {
    this.user = user;
    Assert.isDefined(user, self.name + ' user must be defined');
    Assert.isDefined(user.name, user.username, user.roles, user.district, self.name + ' user validate fail');
    Assert.isDefined(user.district.id, self.name + 'region id must be int');
    Assert.isArray(user.roles, self.name + ' user roles must be array');
    this.formGroup.get(this.formKeys.name).setValue(user.name);
    this.formGroup.get(this.formKeys.username).setValue(user.username);
    this.formGroup.get(this.formKeys.roles).setValue(user.roles.map(role => role.id));
    this.formGroup.get(this.formKeys.region).setValue(user.district.id);
  }
}
