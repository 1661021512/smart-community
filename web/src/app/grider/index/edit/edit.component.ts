import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Assert} from '@yunzhi/utils';
import {GriderService} from '../../../../../projects/lib/src/service/grider.service';
import {Grider} from '../../../../../projects/lib/src/entity/grider';
import {CommonService} from '../../../../../projects/lib/src/service/common.service';
import {District} from '../../../../../projects/lib/src/entity/district';
import {DISTRICT_TYPE} from '../../../../../projects/lib/src/entity/enum/district-type';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  formGroup: FormGroup;
  formKeys = {
    communityId: 'communityId',
    name: 'name',
    username: 'username'
  };
  grider: Grider;

  constructor(private route: ActivatedRoute,
              private commonService: CommonService,
              private griderService: GriderService) {
  }

  /**
   * 仅保留类型为社区的区域
   * @param district 区域
   */
  districtFilter = (district: District) => {
    return district.type === DISTRICT_TYPE.community.value
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: {id?: string}) => {
      console.log(params);
      const id = +params.id;
      Assert.isInteger(id, 'id类型必须是number');
      this.griderService.getById(id)
        .subscribe(data => {
          this.setGrider(data);
        });
    });
  }

  onSubmit(formGroup: FormGroup) {
    this.griderService.update(this.grider.id, {
      webUser: {
        name: formGroup.get(this.formKeys.name).value as string,
      },
      community: {
        id: formGroup.get(this.formKeys.communityId).value as number
      }
    } as Grider).subscribe(() => this.commonService.success(
      () => this.commonService.back('../../', this.route)));
  }

  setGrider(grider: Grider) {
    this.validate(grider);
    this.grider = grider;
    this.formGroup = new FormGroup({});
    this.formGroup.addControl(this.formKeys.name, new FormControl(this.grider.webUser.name, Validators.required));
    this.formGroup.addControl(this.formKeys.communityId, new FormControl(this.grider.community.id, Validators.required));
  }

  validate(grider: Grider) {
    Assert.isNotNullOrUndefined(grider.id, grider.webUser, grider.community, '网格员基本属性验证失败');
    Assert.isNotNullOrUndefined(grider.webUser.username, grider.community.id, '用户或社区信息验证失败');
  }
}
