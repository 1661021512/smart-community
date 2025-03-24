import {Component, OnInit} from '@angular/core';
import {Duty} from '../../../../projects/lib/src/entity/duty';
import {User} from '../../../../projects/lib/src/entity/user';
import {PartyBuilding} from '../../../../projects/lib/src/entity/partyBuilding';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DutyService} from '../../../../projects/lib/src/service/duty.service';
import {PartyBuildingService} from '../../../../projects/lib/src/service/party-building.service';
import {Assert} from '@yunzhi/utils';
import {WebUserService} from '../../../service/web-user.service';
import {DistrictType} from '../../../../projects/lib/src/entity/enum/district-type';
import {CommonService} from '../../../../projects/lib/src/service/common.service';

/**
 * 党建管理 首页
 * #839
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  formGroup = new FormGroup({});
  /**表单关键字*/
  formKeys = {
    name: 'user',
    username: 'username'
  }
  /**查询参数*/
  params = {
    districtId: undefined as number,
    districtType: undefined as DistrictType
  }
  partBuildings = [] as PartyBuilding[];

  // 定义一个Page<Duty>类型的变量pageData
  // pageData = {} as Page<Duty>;
  posts = [] as Duty[];
  user = {} as User;

  constructor(
    private dutyService: DutyService,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private router: Router,
    private partBuildingService: PartyBuildingService,
    private userService: WebUserService
  ) {
  }

  /**
   * 内部数据校验
   */
  private validate(posts: Duty[]) {
    posts.forEach(post => {
      Assert.isNotNullOrUndefined(
        post.id, post.name, post.weight, '数据校验失败，请检查'
      );
    })
  }

  ngOnInit(): void {
    this.userService.currentLoginUser$.subscribe(user => {
      if (user) {
        Assert.isNotNullOrUndefined(user.district, '未获取到用户区域信息');
        this.user = user;
        this.params.districtId = this.user.district.id;
        this.params.districtType = this.user.district.type;
        this.dutyService.getAllByDistrictType(this.params.districtType).subscribe(posts => {
          this.validate(posts);
          this.posts = posts.sort((a, b) => a.weight - b.weight);
          this.loadPartBuildings(this.params.districtId, posts);
        });
      }
    });

    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.username, new FormControl('', Validators.required));
  }

  /**
   * 根据区域ID获取党建信息后与职位信息进行接拼
   * 目的：在前台显示所有的岗位，该岗位有人员的，显示具体的人员信息
   * @param districtId 区域ID
   * @param posts 职位数组
   */
  loadPartBuildings(districtId: number, posts: Duty[]): void {
    this.partBuildingService.getAllByDistrictId(districtId).subscribe((partBuildings) => {
      posts.forEach(post => {
        if (!this.matching(post, partBuildings)) {
          partBuildings.push({duty: post, personName: '---'} as PartyBuilding);
        }
      })
      this.partBuildings = partBuildings;
    }, error => {
      throw new Error(error);
    })
  }

  /**
   * partBuilding表与post表岗位匹配
   */
  matching(post: Duty, partBuildings: Array<PartyBuilding>): boolean {
    let found = false;
    partBuildings.forEach(partBuilding => {
      Assert.isDefined(partBuilding.duty, '职位信息不存在');
      if (!found && partBuilding.duty.id === post.id) {
        found = true;
      }
    });
    return found;
  }

  onRemove(partBuilding: PartyBuilding) {
    this.commonService.confirm(confirmed => {
      if (confirmed) {
        this.partBuildingService.delete(partBuilding.id)
          .subscribe(() => {
            this.commonService.success(() => {
              partBuilding.personName = '---';
              partBuilding.id = undefined;
            });
          });
      }
    });
  }
}
