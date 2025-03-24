import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Job} from '../entity/job';
import {Page} from '@yunzhi/ng-common';
import {YzHttpParams} from '../modal/yz-http-params';
import {map} from 'rxjs/operators';

/**
 * 招聘咨询
 */
@Injectable({
  providedIn: 'root'
})
export class JobService {
  private url = 'job';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 删除
   * @param id ID
   */
  deleteById(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.url + '/' + id);
  }

  /**
   * 新增
   * @param job 招聘信息
   */
  save(job: Job): Observable<Job> {
    return this.httpClient.post<Job>(`${this.url}`, job);
  }

  /**
   * 通过ID获取招聘信息
   */
  getById(recruitmentInformationId: number): Observable<Job> {
    return this.httpClient.get<Job>(`${this.url}/${recruitmentInformationId}`);
  }

  /**
   * 更新
   * @param id ID
   * @param job 招聘信息
   */
  update(id: number, job: Job): Observable<void> {
    return this.httpClient.put<void>(this.url + '/' + id, job);
  }

  /**
   * 小程序端分页
   * @param page 页码
   * @param size 每页大小
   * 1.按发布时间排序
   * 2.时间相同按权重排序
   */
  page(page: number, size: number): Observable<Page<Job>> {
    const params = new YzHttpParams()
      .append('page', page)
      .append('size', size);
    return this.httpClient.get<Page<Job>>(this.url + '/page',
      {params}).pipe(map(data => new Page<Job>(data)));
  }
}
