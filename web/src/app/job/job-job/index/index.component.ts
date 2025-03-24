import {Component, OnInit} from '@angular/core';
import {JobService} from '../../../../../projects/lib/src/service/job.service';
import {environment} from '../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {Page} from '@yunzhi/ng-common';
import {Job} from '../../../../../projects/lib/src/entity/job';
import {Assert} from '@yunzhi/utils';
import {CommonService} from '../../../../../projects/lib/src/service/common.service';

/**
 * 招聘咨询管理分页查询
 */
@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  pageData = {} as Page<Job>;
  private params = {
    page: 0,
    size: environment.size
  }

  constructor(private jobService: JobService,
              private commonService: CommonService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (Number.isInteger(+params.page)) {
        this.params.page = params.page;
      }

      if (Number.isInteger(+params.size)) {
        this.params.size = params.size;
      }
      this.load(this.params);
    });
  }

  load(params: {size: number; page: number}) {
    this.jobService.page(params.page, params.size)
      .subscribe(data => {
        this.setData(data);
      })

  }

  setData(jobPage: Page<Job>) {
    this.validate(jobPage.content);
    this.pageData = jobPage;
  }

  validate(jobs: Job[]) {
    jobs.forEach(job => {
      Assert.isObject(job.createUser, '创建用户不能为空');
      Assert.isDefined(job.title, job.createTime, job.origin, job.endDate, '基础属性校验错误');
    });
  }

  onDelete(job: Job, index: number) {
    this.commonService.confirm(confirmed => {
      if (confirmed) {
        this.jobService.deleteById(job.id)
          .subscribe(() => {
            this.commonService.success(() => {
              this.pageData.content.splice(index, 1);
            });
          })
      }
    });
  }

  onSizeChange(size: number) {
    this.params.size = size;
    this.load(this.params);
  }

  onPageChange(page: number) {
    this.params.page = page;
    this.load(this.params);
  }
}
