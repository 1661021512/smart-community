import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent} from '@ionic/angular';
import {environment} from '../../../environments/environment';
import {Job} from '../../../../../lib/src/entity/job';
import {from} from 'rxjs';
import {Router} from '@angular/router';
import {JobService} from '../../../../../lib/src/service/job.service';

/**
 *就业服务首页
 */
@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  @ViewChild('ionContent')
  ionContent: IonContent;
  /**
   * 所有的招聘咨询
   */
  items = [] as Job[];
  /**
   * 是否正在加载中
   */
  loading = false;
  /**
   * 分页数据
   */
  params = {
    page: 0,
    size: environment.size
  };
  constructor(private route: Router,
              private jobService: JobService) {
  }

  ngOnInit(): void {
    // 如果数据不能铺满屏幕不能滑动，也无法触发加载数据的方法，
    // 所以初始化时加载10条数据
    this.params.size*=2;
    this.load(this.params);
    this.params.size = environment.size;
  }

  /**
   * 向下滑动触发的方法
   * 重新向后台申请新的一页的数据
   */
  logScrollEnd() {
    if(!this.loading) {
      from(this.ionContent.getScrollElement())
        .subscribe(scrollElement => {
          if (scrollElement.scrollTop +1 >=
            scrollElement.scrollHeight-scrollElement.clientHeight){
            this.params.page++;
            this.load(this.params);
          }
        });
    }
  }

  /**
   * 重新加载分页数据
   * @param params 分页数据
   */
  load(params: {page: number; size: number}) {
    this.loading = true;
    this.jobService.page(params.page, params.size)
      .subscribe(data => {
        this.loading = false;
        // 由于手机端的特殊性，这里用的是内容接拼
        this.items = this.items.concat(data.content);
      });
  }
}
