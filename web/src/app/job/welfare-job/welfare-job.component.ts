import {Component, OnInit} from '@angular/core';
import {Page} from '@yunzhi/ng-common';
import {WelfareJob} from '../../../../projects/lib/src/entity/welfare-job';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {WelfareJobService} from '../../../../projects/lib/src/service/welfare-job.service';
import {Assert, getDefaultWhenValueIsInValid} from '@yunzhi/utils';
import {config} from '../../../conf/app.config';

/**
 *公益性岗位首页
 */
@Component({
  selector: 'app-welfare-job',
  templateUrl: './welfare-job.component.html',
  styleUrls: ['./welfare-job.component.scss']
})
export class WelfareJobComponent implements OnInit {

  formKeys = {
    name: 'name',
    sex: 'sex',
    age: 'age',
    ageStart: 'ageStart',
    ageEnd: 'ageEnd',
    phone: 'phone',
    workPlace: 'workPlace',
    post: 'post',
    postType: 'postType',
    page: 'page',
    size: 'size'
  };
  pageData = {} as Page<WelfareJob>
  params = {} as Params;
  queryForm = new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private welfareJobService: WelfareJobService,
  ) {
  }

  ngOnInit(): void {
    this.initQueryForm();
    this.subscribeQueryParams();
  }

  /**
   * 初始化查询组件
   */
  private initQueryForm() {
    this.queryForm.addControl(this.formKeys.name, new FormControl(''));
    this.queryForm.addControl(this.formKeys.sex, new FormControl(null));
    this.queryForm.addControl(this.formKeys.ageStart, new FormControl(null));
    this.queryForm.addControl(this.formKeys.ageEnd, new FormControl(null));
    this.queryForm.addControl(this.formKeys.phone, new FormControl(''));
    this.queryForm.addControl(this.formKeys.workPlace, new FormControl(''));
    this.queryForm.addControl(this.formKeys.postType, new FormControl(''));
  }

  /**
   * 重置表单
   */
  onReset(): void {
    this.queryForm.get(this.formKeys.name).setValue('');
    this.queryForm.get(this.formKeys.sex).setValue(null);
    this.queryForm.get(this.formKeys.ageStart).setValue(null);
    this.queryForm.get(this.formKeys.ageEnd).setValue(null);
    this.queryForm.get(this.formKeys.phone).setValue('');
    this.queryForm.get(this.formKeys.workPlace).setValue('');
    this.queryForm.get(this.formKeys.postType).setValue('');
  }

  public updateQueryForm(params: Params): void {
    this.queryForm.get(this.formKeys.name).setValue(params[this.formKeys.name]);
    this.queryForm.get(this.formKeys.sex).setValue(params[this.formKeys.sex]);
    this.queryForm.get(this.formKeys.ageStart).setValue(params[this.formKeys.ageStart]);
    this.queryForm.get(this.formKeys.ageEnd).setValue(params[this.formKeys.ageEnd]);
    this.queryForm.get(this.formKeys.phone).setValue(params[this.formKeys.phone]);
    this.queryForm.get(this.formKeys.workPlace).setValue(params[this.formKeys.workPlace]);
    this.queryForm.get(this.formKeys.postType).setValue(params[this.formKeys.postType]);
  }

  /**
   * 向后台发起数据查询
   * @param params 查询参数
   */
  load(params: Params): void {
    getDefaultWhenValueIsInValid(params[this.formKeys.page], '0');
    getDefaultWhenValueIsInValid(params[this.formKeys.size], config.size.toString());
    this.welfareJobService.page(
      getDefaultWhenValueIsInValid(+params[this.formKeys.page], 0),
      getDefaultWhenValueIsInValid(+params[this.formKeys.size], config.size),
      {
        name: params[this.formKeys.name],
        sex: params[this.formKeys.sex],
        ageStart: params[this.formKeys.ageStart],
        ageEnd: params[this.formKeys.ageEnd],
        phone: params[this.formKeys.phone],
        workPlace: params[this.formKeys.workPlace],
        postType: params[this.formKeys.postType],
      }
    ).subscribe(page => {
      this.validateDate(page);
      this.pageData = page;
    });
  }

  /**
   * 点击页码
   * @param page 第几页
   */
  onPageChange(page: number): void {
    this.params = {...this.params, ...{page}}
    this.reload(this.params);
  }

  /**
   * 点击每页大小
   * @param size 每页大小
   */
  onSizeChange(size: number): void {
    this.params.size = size;
    this.reload(this.params);
  }

  /**
   * 订阅分页查询参数
   */
  public subscribeQueryParams(): void {
    this.route.queryParams.subscribe((params: {page?: string, size?: string}) => {
      this.params = params;
      this.updateQueryForm(this.params);
      this.load(params);
    })
  }

  /**
   * 重新加载
   * @param params 查询参数
   */
  public reload(params: Params) {
    this.commonService.reload(params, this.route);
  }

  /**
   * 提交数据
   * @param queryForm 查询表单
   */
  onSubmit(queryForm: FormGroup) {
    this.params = {...this.params, ...queryForm.value}
    this.reload(this.params);
  }

  validateDate(page: Page<WelfareJob>) {
    Assert.isNotNullOrUndefined(page.size, page.totalElements, page.number, '为满足初始化条件');
    page.content.forEach(welfareJob => {
      Assert.isNotNullOrUndefined(
        welfareJob.name, welfareJob.sex, welfareJob.phone, welfareJob.workPlace, welfareJob.postType,
        '为满足table初始化条件'
      );
    });
  }

  /**
   * 删除
   */
  onDelete(index: number, id: number): void {
    this.commonService.confirm(confirm => {
      if (confirm) {
        this.welfareJobService.delete(id)
          .subscribe(() => {
            this.commonService.success();
            this.pageData.content.splice(index, 1);
          }, error => console.log('删除失败', error));
      }
    });
  }
}
