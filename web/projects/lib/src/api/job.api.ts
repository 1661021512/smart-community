import {ApiInjector, MockApiInterface} from '@yunzhi/ng-mock-api';
import {Job} from '../entity/job';
import {Assert, randomNumber, randomString, randomTimestamp} from '@yunzhi/utils';
import {User} from '../entity/user';
import {UrlMatcher} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {generatePage} from '@yunzhi/ng-common';

/**
 * 招聘咨询mockApi
 */
export class JobApi implements MockApiInterface {
  private baseUrl = 'job';
  private name = 'jobApi ';

  getInjectors(): ApiInjector[] {
    return [
      {
        method: 'POST',
        url: `${this.baseUrl}`,
        description: 'save',
        result: (urlMatches: any, options: {
          body: Job;
        }) => {
          const body = options.body;
          Assert.isString(body.title,
            body.summary,
            body.content, this.name + 'some properties must be string');
          return {
            endDate: body.endDate,
            id: randomNumber(),
            title: body.title,
            weight: randomNumber(),
            summary: body.summary,
            content: body.content,
            createUser: body.createUser,
            createTime: randomTimestamp(),
          } as Job;
        }
      },
      {
        method: 'GET',
        url: `${this.baseUrl}/(\\d+)`,
        description: 'getById',
        result: (urlMatches: Array<string>) => {
          const id = +urlMatches[1];
          Assert.isNumber(id, 'id类型必须为number');
          const user = {
            id: randomNumber()
          } as User;
          return {
            id: randomNumber(),
            title: randomString('标题'),
            weight: randomNumber(),
            summary: randomString('摘要'),
            content: randomString('公告内容'),
            createUser: user,
            createTime: randomTimestamp(),
          } as Job;
        }
      },
      {
        url: this.baseUrl + '/page',
        description: 'page',
        result: (url, options: {params: HttpParams}) => {
          const page = +options.params.get('page');
          const size = +options.params.get('size');
          return generatePage<Job>(page, size, index => {
            return {
              id: index + 1,
              endDate: 20121212,
              title: randomString('title'),
              weight: randomNumber(),
              origin: randomString('来源'),
              summary: randomString('summary'),
              content: randomString('content'),
              createUser: {
                name: randomString('name')
              },
              createTime: randomTimestamp(),
            } as Job;
          });
        }
      },
      {
        method: 'PUT',
        url: `${this.baseUrl}/(\\d+)`,
        description: 'update',
        result: (urlMatches: (string)[], option: {
          body: Job;
        }) => {
          const id = +urlMatches[1];
          Assert.isNumber(id, 'id must be number');
          const body = option.body;
          Assert.isString(body.title,
            body.summary,
            body.content, this.name + 'some properties must be string');
          return {} as Job
        }
      },
      {
        url: this.baseUrl + '/wechatPage',
        description: '小程序端page分页',
        result: (url: UrlMatcher, options: {params: HttpParams}) => {
          const params = options.params;
          const page = +params.get('page');
          const size = +params.get('size');
          return generatePage(page, size, index => {
            return {
              id: page * size + index + 1,
              title: randomString('标题'),
              summary: randomString('摘要')
            } as Job
          });
        }
      }
    ]
  }

}
