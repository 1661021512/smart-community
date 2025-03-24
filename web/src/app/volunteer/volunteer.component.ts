import {Component, OnInit} from '@angular/core';
import {Page} from '@yunzhi/ng-common';
import {Volunteer} from '../../../projects/lib/src/entity/volunteer';
import {VolunteerService} from '../../../projects/lib/src/service/volunteer.service';
import {Assert, getDefaultWhenValueIsInValid} from '@yunzhi/utils';
import {config} from '../../conf/app.config';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {EducationType} from '../../../projects/lib/src/entity/enum/education-type';
import {SEX, sex} from '../../../projects/lib/src/entity/enum/sex';
import {CommonService} from '../../../projects/lib/src/service/common.service';


/**
 * 志愿者管理
 * #1057
 */
@Component({
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.scss']
})
export class VolunteerComponent implements OnInit {
  female = SEX.female.value;
  keys = {
    page: 'page',
    size: 'size',
    name: 'name',
    sex: 'sex',
    education: 'education',
    beStar: 'beStar',
    ageEnd: 'ageEnd',
    ageBegin: 'ageBegin',
    phone: 'phone',
    volunteerActivity: 'volunteerActivity'
  }
  male = SEX.male.value;
  /**
   * 弹窗时对应的志愿者信息
   */
  modalVolunteer = {} as Volunteer;
  pageData = {} as Page<Volunteer>
  params = {} as Params;
  queryForm = new FormGroup({});
  /**
   * 显示设置明星弹窗
   */
  showSetStarModal = false;
  /**
   * 显示更新权限弹窗
   */
  showUpdateWeightModal = false;

  constructor(private volunteerService: VolunteerService,
              private route: ActivatedRoute,
              private router: Router,
              private commonService: CommonService) {
  }

  /**
   * 点击改变每页大小
   * @param size 每页大小
   */
  onSizeChange(size: number): void {
    this.params.size = size;
    this.reload();
  }

  /**
   * 查询
   * page: 当前页 size: 每页大小
   */
  reload(): void {
    const params = this.params;
    this.volunteerService.page(
      getDefaultWhenValueIsInValid(+params[this.keys.page], 0),
      getDefaultWhenValueIsInValid(+params[this.keys.size], config.size),
      {
        name: params[this.keys.name],
        sex: params[this.keys.sex],
        ageBegin: params[this.keys.ageBegin],
        ageEnd: params[this.keys.ageEnd],
        volunteerActivity: params[this.keys.volunteerActivity],
        education: params[this.keys.education],
        beStar: params[this.keys.beStar]
      }
    ).subscribe(page => {
      this.setData(page);
    })
  }

  /**
   * 点击分页
   * @param page 当前页
   */
  onPageChange(page: number): void {
    this.params.page = page;
    this.reload();
  }

  ngOnInit(): void {
    this.initQueryForm();
    this.route.queryParams.subscribe((params: {page?: string, size?: string}) => {
      this.queryForm.get(this.keys.name).setValue(params[this.keys.name]);
      this.queryForm.get(this.keys.sex).setValue(params[this.keys.sex]);
      this.queryForm.get(this.keys.phone).setValue(params[this.keys.phone]);
      this.queryForm.get(this.keys.ageBegin).setValue(params[this.keys.ageBegin]);
      this.queryForm.get(this.keys.ageEnd).setValue(params[this.keys.ageEnd]);
      this.queryForm.get(this.keys.volunteerActivity).setValue(params[this.keys.volunteerActivity]);
      this.queryForm.get(this.keys.education).setValue(params[this.keys.education]);
      this.queryForm.get(this.keys.beStar).setValue(params[this.keys.beStar]);
      this.reload();
    });
  }

  initQueryForm() {
    this.queryForm.addControl(this.keys.name, new FormControl(''));
    this.queryForm.addControl(this.keys.ageBegin, new FormControl(null));
    this.queryForm.addControl(this.keys.ageEnd, new FormControl(null));
    this.queryForm.addControl(this.keys.sex, new FormControl(null));
    this.queryForm.addControl(this.keys.phone, new FormControl(''));
    this.queryForm.addControl(this.keys.beStar, new FormControl(null));
    this.queryForm.addControl(this.keys.volunteerActivity, new FormControl(null));
    this.queryForm.addControl(this.keys.education, new FormControl(null));
  }

  onSubmit(queryForm: FormGroup) {
    const form = {
      name: queryForm.get(this.keys.name).value as string,
      ageBegin: queryForm.get(this.keys.ageBegin).value as number,
      ageEnd: queryForm.get(this.keys.ageEnd).value as number,
      sex: queryForm.get(this.keys.sex).value as sex,
      phone: queryForm.get(this.keys.phone).value as string,
      beStar: queryForm.get(this.keys.beStar).value as boolean,
      volunteerActivity: queryForm.get(this.keys.volunteerActivity).value as string,
      education: queryForm.get(this.keys.education).value as EducationType
    }
    this.params = {...this.params, ...form}
    this.reload();
  }

  /**
   * 设置为服务明星
   * @param volunteer 志愿者
   */
  onSetStar(volunteer: Volunteer) {
    this.modalVolunteer = volunteer;
    this.showSetStarModal = true;
  }

  /**
   * 取消明星
   * @param volunteer 志愿者
   */
  onCancelStar(volunteer: Volunteer) {
    this.volunteerService.cancelStar(volunteer.id)
      .subscribe(data => {
        this.commonService.success(() => {
          volunteer.beStar = data.beStar;
          volunteer.weight = data.weight;
        });
      }, error => console.log('删除失败', error));
  }

  onSetStarSubmit(data: {volunteer: Volunteer, weight: number}) {
    this.volunteerService.setStar(this.modalVolunteer.id, data.weight)
      .subscribe(value => {
        this.showSetStarModal = false;
        data.volunteer.beStar = value.beStar;
        data.volunteer.weight = value.weight;
        this.commonService.success(() => {
        });
      })
  }

  setData(page: Page<Volunteer>) {
    page.content.forEach(volunteer => {
      Assert.isArray(volunteer.volunteerActivitySignUps, '参与的志愿活动类型不是数组');
      volunteer.volunteerActivitySignUps.forEach(signUp => {
        Assert.isObject(signUp.volunteerActivity, '志愿活动不是对象');
      })
    });
    this.pageData = page;
  }

  /**
   * 更新排名
   * @param volunteer 志愿者
   */
  onUpdateWeight(volunteer: Volunteer) {
    this.modalVolunteer = volunteer;
    this.showUpdateWeightModal = true;
  }

  onUpdateWeightSubmit(data: {volunteer: Volunteer; weight: number}) {
    this.volunteerService.updateWeight(this.modalVolunteer.id, data.weight)
      .subscribe(value => {
        this.showUpdateWeightModal = false;
        data.volunteer.weight = value.weight;
        this.commonService.success(() => {
        });
      })
  }
}
