import {ApiInjector, MockApiInterface} from '@yunzhi/ng-mock-api'
import {Assert, randomBoolean, randomNumber, randomString, randomTimestamp} from '@yunzhi/utils'
import {WelfareJob} from '../entity/welfare-job'
import {User} from '../entity/user'
import {HttpParams} from '@angular/common/http';
import {Page} from '@yunzhi/ng-common';

/**
 * 就业服务-公益性管理-mockApi
 */
export class WelfareJobApi implements MockApiInterface {
  private baseUrl = 'welfareJob';

  getWelfare(page: number, size: number): WelfareJob[] {
    let welfareJobs = new Array<WelfareJob>();
    // 设置初始时间模拟（当前时间）
    const dateTime = new Date();
    for (let i = 0; i < +size; i++) {
      const welfareJob = {
        id: i + 1,
        name: randomString('name'),
        sex: randomBoolean(),
        birthday: dateTime.valueOf() - randomNumber() * 12345678,
        phone: '139****0000',
        workPlace: randomString('工作岗位'),
        post: randomString('岗位'),
        postType: randomNumber(4),
      } as WelfareJob;
      welfareJobs.push(welfareJob);
    }

    return welfareJobs;
  }

  getInjectors(): ApiInjector[] {
    return [
      {
        url: this.baseUrl + '/(\\d+)',
        description: 'getById | 根据welfareJobId获取公益性岗位信息',
        result: (urlMatches: any) => {
          const id = +urlMatches[1];
          Assert.isTrue(Number.isInteger(id), 'id must be number');
          // 设置初始时间模拟（当前时间）
          const dateTime = new Date();
          return {
            id,
            name: randomString('名字'),
            sex: randomBoolean(),
            birthday: dateTime.valueOf() - randomNumber() * 12345678,
            phone: '13912341234',
            workPlace: randomString('工作单位'),
            post: randomString('职位'),
            postType: randomNumber(4)
          } as WelfareJob;
        }
      },
      {
        method: 'PUT',
        description: 'update | 更新公益性岗位信息',
        url: `${this.baseUrl}/(\\d+)`,
        result: (urlMatches: (string)[], option: {body: WelfareJob}) => {
          const id = +urlMatches[1];
          Assert.isNumber(id, 'id must be integer');
          const welfareJob = option.body as WelfareJob;
          console.log('测试保存：', welfareJob);
          Assert.isDefined(welfareJob, welfareJob.name, welfareJob.birthday, welfareJob.sex,
            welfareJob.phone, welfareJob.workPlace, welfareJob.post, welfareJob.postType, self.name + ' welfareJob checked fail');
          welfareJob.id = id;
          return welfareJob;
        }
      }, {
        method: 'GET',
        description: 'page | 公益性岗位首页信息分页',
        url: `${this.baseUrl}/page`,
        result: (urlMatches: (string)[], options: {params: HttpParams;}) => {
          const params = options.params as HttpParams;
          const page = +params.get('page');
          const size = +params.get('size');
          Assert.isInteger(page, size, 'page, size为必选');
          Assert.isDefined(params.get('name'), 'name选填参数未添加全');
          Assert.isDefined(params.get('sex'), 'sex选填参数未添加全');
          Assert.isDefined(params.get('ageStart'), 'ageStart选填参数未添加全');
          Assert.isDefined(params.get('ageEnd'), 'ageEnd选填参数未添加全');
          Assert.isDefined(params.get('phone'), 'phone选填参数未添加全');
          Assert.isDefined(params.get('workPlace'), 'workPlace选填参数未添加全');
          Assert.isDefined(params.get('postType'), 'postType选填参数未添加全');

          return {
            content: this.getWelfare(page, size), number: page, size, totalElements: 40 + randomNumber()
          } as Page<WelfareJob>;
        }
      }, {
        method: 'DELETE',
        description: 'delete | 删除公益性岗位信息',
        url: `${this.baseUrl}/(\\d+)`,
      }, {
        method: 'POST',
        description: 'save | 新增公益性岗位信息',
        url: `${this.baseUrl}`,
        result: (urlMatches: (string)[], option: {body: WelfareJob}) => {
          const welfareJob = option.body as WelfareJob;
          console.log('测试保存：', welfareJob);
          Assert.isDefined(welfareJob, welfareJob.name, welfareJob.birthday, welfareJob.sex,
            welfareJob.phone, welfareJob.workPlace, welfareJob.post, welfareJob.postType, self.name + ' welfareJob checked fail');
          return welfareJob;
        }
      },
    ];
  }
}
