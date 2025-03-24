import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {WelfareJob} from '../../../../../projects/lib/src/entity/welfare-job'
import {Assert} from '@yunzhi/utils'
import {WelfareJobService} from '../../../../../projects/lib/src/service/welfare-job.service'
import {ActivatedRoute} from '@angular/router'
import {CommonService} from '../../../../../projects/lib/src/service/common.service'

/**
 * 公益性岗位管理详情
 * 功能：#1274
 */

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  /**
   * 初始化表单组
   */
  formGroup = new FormGroup({});

  welfareJob: WelfareJob;
  constructor(private welfareJobService: WelfareJobService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    // 初始化显示信息
    this.welfareJob = new WelfareJob();
    // 获取id并找出对应welfareJob
    this.route.params.subscribe(param => {
      const id = +param.id;
      Assert.isNumber(id, 'id must be number');
      this.loadById(+id);
    });
    return ;
  }

  /**
   * 由后台加载预编辑的公益性岗位
   * @param id
   */
  loadById(id: number): void {
    this.welfareJobService.getById(id)
      .subscribe((welfareJob) => {
        Assert.isNotNullOrUndefined(welfareJob, welfareJob.name, welfareJob.birthday, welfareJob.sex,
          welfareJob.phone, welfareJob.workPlace, welfareJob.post, welfareJob.postType, 'some properties must be passed');
        this.welfareJob = welfareJob;
      }, error => console.log(error))
  }

}
