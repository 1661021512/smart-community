import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {config} from '../../../conf/app.config';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {VolunteerActivity} from 'projects/lib/src/entity/volunteer-activity';
import {Page} from '@yunzhi/ng-common';
import {Assert, getDefaultWhenValueIsInValid, Utils} from '@yunzhi/utils';
import {VolunteerActivityService} from 'projects/lib/src/service/volunteer-activity.service';

/**
 * 志愿者活动
 * #1053
 */
@Component({
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  formControl = new FormControl('');
  formGroup = new FormGroup({});
  /**
   * 表单关键字
   */
  formKeys = {
    page: 'page',
    size: 'size',
    name: 'name',
    endDate: 'endDate',
    state: 'state',
    contact: 'contact',
    place: 'place'
  };
  pageData = {} as Page<VolunteerActivity>;
  params = {} as Params;

  constructor(private commonService: CommonService,
              private volunteerActivityService: VolunteerActivityService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    // 使用this.keys初始化FormControl，从而避免拼写错误
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.endDate, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.state, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.contact, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.place, new FormControl('', Validators.required));

    // 订阅参数变化
    this.route.queryParams.subscribe((params: {page?: string, size?: string}) => {
      // 缓存查询参数
      this.params = params;
      // 使用参数中的数据设置formGroup
      this.formGroup.get(this.formKeys.name).setValue(params[this.formKeys.name]);
      this.formGroup.get(this.formKeys.endDate).setValue(params[this.formKeys.endDate] === undefined ? null : +params[this.formKeys.endDate]);
      this.formGroup.get(this.formKeys.state).setValue(params[this.formKeys.state]);
      this.formGroup.get(this.formKeys.contact).setValue(params[this.formKeys.contact]);
      this.formGroup.get(this.formKeys.place).setValue(params[this.formKeys.place]);

      // 发起查询
      this.volunteerActivityService.page(
        // 调用stringToIntegerNumber将查询的字符串转为number
        getDefaultWhenValueIsInValid(params[this.formKeys.page], '0'),
        getDefaultWhenValueIsInValid(params[this.formKeys.size], config.size.toString()),
        {
          name: params[this.formKeys.name],
          endDate: Utils.timestampToIntDate(this.formGroup.get(this.formKeys.endDate).value as number),
          state: params[this.formKeys.state],
          todayDate: Utils.timestampToIntDate(new Date().getTime() as number),
          contact: params[this.formKeys.contact],
          place: params[this.formKeys.place],
        },
      ).subscribe(page => {
        this.validateData(page);
        this.pageData = page;
      })
    });
  }

  /**
   * 删除
   * @param object 活动
   */
  onDelete(object: VolunteerActivity): void {
    Assert.isNotNullOrUndefined(object.id, 'id未定义');
    console.log('测试id：' + object.id);
    this.commonService.confirm((confirm = false) => {
      if (confirm) {
        const index = this.pageData.content.indexOf(object);
        this.volunteerActivityService.delete(object.id!)
          .subscribe(() => {
            this.commonService.success(() => this.pageData.content.splice(index, 1));
          });
      }
    }, '');
  }

  /**
   * 点击分页
   * @param page 当前页
   */
  onPageChange(page: number): void {
    this.reload({...this.params, ...{page}});
  }

  /**
   * 点击改变每页大小
   * @param size 每页大小
   */
  onSizeChange(size: number): void {
    this.reload({...this.params, ...{size}});
  }

  /**
   * 查询
   * @param params page: 当前页 size: 每页大小
   */
  reload(params: Params): void {
    //this.commonService.reloadByParam(params).then();
    // 将参数转换为路由参数
    const queryParams = CommonService.convertToRouteParams(params);
    this.router.navigate(['./'],
      {
        relativeTo: this.route,
        queryParams: queryParams,
      }).then();
  }

  /**
   * 校验数据是否满足前台列表的条件
   * @param data 分页数据
   */
  validateData(data: Page<VolunteerActivity>): void {
    data.content.forEach(v => this.validateActivity(v));
    this.pageData = data;
  }

  /**
   * 校验字段是否符合V层表现
   * @param volunteerActivity 志愿者活动
   */
  validateActivity(volunteerActivity: VolunteerActivity): void {
    // 必有条件
    Assert.isNotNullOrUndefined(
      volunteerActivity.id,
      volunteerActivity.name,
      volunteerActivity.endDate,
      volunteerActivity.contact,
      volunteerActivity.numberOfApplicants,
      volunteerActivity.numberOfAudited,
      volunteerActivity.numberOfPlanned,
      volunteerActivity.place,
      '未满足table列表的初始化条件'
    );
  }

  onSubmit(queryForm: FormGroup): void {
    this.reload({...this.params, ...queryForm.value});
  }
}
