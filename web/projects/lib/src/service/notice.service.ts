import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '@yunzhi/ng-common';
import {Notice} from '../entity/notice';
import {YzHttpParams} from '../modal/yz-http-params';
import {map} from 'rxjs/operators';
import {Assert} from "@yunzhi/utils"
import {Attachment} from '../entity/attachment';

/**
 * 通知公告
 */
@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  private url = 'notice';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 删除
   */
  delete(noticeId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.url}/${noticeId.toString()}`);
  }

  /**
   * 根据ID获取实体
   * @param id id
   */
  public getById(id: number): Observable<Notice> {
    Assert.isNumber(id, 'type of id must be number');
    return this.httpClient.get<Notice>(`${this.url}/${id}`);
  }

  /**
   * 分页
   * 排序规则：
   * 1. 权重由小到大排序
   * 2. 发布时间由近及远排序(最近发布的放在前面)
   * @param page 页码
   * @param size 每页大小
   * @param param 查询参数
   */

  page(page: number, size: number, param?: {
    name?: string
  }): Observable<Page<Notice>> {
    const params = new YzHttpParams()
      .append('page', page)
      .append('size', size)
      .append('name', param?.name);
    return this.httpClient.get<Page<Notice>>(this.url + '/page',
      {params}).pipe(map(data => new Page<Notice>(data)));
  }

  /**
   * 新建公告
   */
  save(notice: Notice): Observable<Notice> {
    Assert.isString(notice.title, 'type of notice title must be string');
    Assert.isString(notice.subTitle, 'type of notice subTitle must be string');
    Assert.isString(notice.content, 'type of notice content must be string');
    Assert.isString(notice.summary, 'type of notice abstract must be string');

    return this.httpClient.post<Notice>(`${this.url}`, notice)
  }

  /**
   * 更新基本信息
   * @param id id
   * @param notice 更新的公告
   */
  update(id: number, notice: {
    id:  number,
    title: string,
    subTitle:  string,
    content: string
    summary: string,
    image: Attachment
  }): Observable<Notice> {
    Assert.isNumber(id, 'type of id must be number');
    Assert.isString(notice.title, 'type of notice title must be string');
    Assert.isString(notice.subTitle, 'type of notice subTitle must be string');
    Assert.isString(notice.content, 'type of notice content must be string');
    Assert.isString(notice.summary, 'type of notice abstract must be string');
    return this.httpClient.put<Notice>(`${this.url}/${id}`, notice);
  }
}
