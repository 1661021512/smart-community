import {Component, OnInit} from '@angular/core';
import {Job} from '../../../../../lib/src/entity/job';
import {ActivatedRoute} from '@angular/router';
import {JobService} from '../../../../../lib/src/service/job.service';
import {Assert} from '@yunzhi/utils';

/**
 *招聘咨询详情
 */
@Component({
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  job: Job;

  constructor(private route: ActivatedRoute,
              private jobService: JobService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params.id;
      Assert.isInteger(+id, 'id类型不正确');
      this.jobService.getById(id)
        .subscribe(job => {
          this.setData(job);
        })
    })
  }

  setData(job: Job) {
    this.job = job;
  }
}
