import {ApiInjector, MockApiInterface} from '@yunzhi/ng-mock-api';
import {UrlMatcher} from '@angular/router';
import {generatePage} from '@yunzhi/ng-common';
import {Notice} from '../entity/notice';
import {HttpParams} from '@angular/common/http';
import {Assert, randomNumber, randomString} from '@yunzhi/utils';

/**
 * 通知公告
 */
export class NoticeApi implements MockApiInterface {
  private url = 'notice';

  getInjectors(): ApiInjector[] {
    return [{
      url: this.url + '/page',
      description: 'page 分页',
      result: (url: UrlMatcher, options: {params: HttpParams}) => {
        const params = options.params;
        const page = +params.get('page');
        const size = +params.get('size');
        return generatePage(page, size, index => {
          return {
            id: index + 1,
            title: randomString('这里是正标题'),
            subTitle: randomString('这里是副标题'),
            createUser:{
              id: randomNumber(),
              name: randomString('发布者')
            },
            summary: randomString('这里是摘要'),
            createTime: 1631836800000,
            content: '<p>这是带有html标识的正文</p>',
            image: {
              file: {
                path: '/assets/image',
                name: 'header.png'
              }
            }
          } as Notice
        });
      }
    },
      {
        method: 'DELETE',
        description: 'delete 删除通知公告',
        url: `${this.url}/(\\d+)`
      },
      {
        method: 'GET',
        url: `${this.url}/(\\d+)`,
        description: 'getById: 获取指定ID的通知公告',
        result: (urlMatches: Array<string>) => {
          // 使用 + 完成字符串向数字的转换
          const id = +urlMatches[1];
          Assert.isInteger(id, 'id类型必须为number');

          return {
            id: randomNumber(),
            title: randomString('这里是正标题'),
            subTitle: randomString('这里是副标题'),
            summary: randomString('这里是摘要'),
            createUser:{
              id: randomNumber(),
              name: randomString('发布者')
            },
            createTime: 1631836800000,
            content: '<p>惠民苑小区将于2021年9月28日（星期二）8:30-18:00清洗消毒1-15栋生活用水水池，\n' +
              '            届时将停止水池供水，请各住户提前做好储水准备。</p>',
            image: {
              file: {
                path: '/assets/image',
                name: 'header.png'
              }
            }
          } as Notice
        }
      },
      {
        method: 'PUT',
        url: `${this.url}/(\\d+)`,
        description: 'update: 更新通知公告',

        result: (urlMatches: (string)[], option: {
          body: Notice;
        }) => {
          const notice = option.body;

          return {
            ...notice,
            ...{
              id: +urlMatches[1],
            }
          }
        }
      },
      {
        method: 'POST',
        url: this.url,
        description: 'save: 新增公告,后台需要获取当前用户作为createUser，获取时间作为createTime',
        result: (urlMatches: any, option: {body: {title: string, subTitle: string, content: string, abstract: string};}) => {
          let body = {} as {title: string, subTitle: string, content: string, abstract: string};

          if (option) {
            body = option.body;
          }

          return {
            id: randomNumber(),
            title: body.title,
            subTitle: body.subTitle,
            summary: body.abstract,
            createUser:{
              id: randomNumber(),
              name: randomString('发布者')
            },
            createTime: 1631836800000,
            content: body.content,
            image: {
              file: {
                path: '/assets/image',
                name: 'header.png'
              }
            }
          } as Notice
        }
      },
    ];
  }

}
