import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import {CommonService} from './common.service'
import {Router} from '@angular/router'
import {Observable} from 'rxjs'
import {WelfareJob} from '../entity/welfare-job'
import {Assert, isNotNullOrUndefined} from '@yunzhi/utils'
import {Page} from '@yunzhi/ng-common';
import {map} from 'rxjs/operators';

/**
 * 就业服务-公益性岗位管理-服务层
 */
@Injectable({
  providedIn: 'root'
})
export class WelfareJobService {
  private baseUrl = 'welfareJob';

  constructor(protected httpClient: HttpClient,
              private commonService: CommonService,
              private router: Router) {
  }

  /**
   * 通过Id获取公益性岗位信息
   */
  public getById(welfareJobId: number): Observable<WelfareJob> {
    return this.httpClient.get<WelfareJob>(`${this.baseUrl}/${welfareJobId.toString()}`);
  }

  /**
   * 更新
   */
  public update(id: number, welfareJob: WelfareJob): Observable<WelfareJob> {
    Assert.isNumber(id, 'userId must be number');
    Assert.isNotNullOrUndefined(welfareJob, welfareJob.name, welfareJob.birthday, welfareJob.sex,
      welfareJob.phone, welfareJob.workPlace, welfareJob.post, welfareJob.postType,
      'some properties must be passed');

    return this.httpClient.put<WelfareJob>(`${this.baseUrl}/${id.toString()}`, welfareJob);
  }

  /**
   * 分页
   * @param page
   * @param size
   * @param param
   */
  page(page: number, size: number, param: {
    name?: string, sex?: number, ageStart?: number, ageEnd?: number, phone?: string, workPlace?: string, postType?: string
  }): Observable<Page<WelfareJob>> {
    Assert.isInteger(page, size, '分页信息类型不正确');
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('name', isNotNullOrUndefined(param.name) ? param.name.toString() : '')
      .append('sex', isNotNullOrUndefined(param.sex) ? toString() : null)
      .append('ageStart', isNotNullOrUndefined(param.ageStart) ? toString() : null)
      .append('ageEnd', isNotNullOrUndefined(param.ageEnd) ? toString() : null)
      .append('phone', isNotNullOrUndefined(param.phone) ? toString() : '')
      .append('workplace', isNotNullOrUndefined(param.workPlace) ? toString() : '')
      .append('postType', isNotNullOrUndefined(param.postType) ? toString() : '')

    return this.httpClient.get<Page<WelfareJob>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<WelfareJob>(data).toObject(o => new WelfareJob(o))));
  }

  /**
   * 新建
   */
  public save(welfareJob: WelfareJob): Observable<WelfareJob> {
    Assert.isString(welfareJob.name, welfareJob.phone, welfareJob.workPlace, welfareJob.post, 'some properties must be string');
    Assert.isNumber(welfareJob.birthday, welfareJob.postType, 'some properties must be number');
    Assert.isNotNullOrUndefined(welfareJob.sex, 'sex must be passed');

    return this.httpClient.post<WelfareJob>(`${this.baseUrl}`, welfareJob);
  }

  /**
   * 删除
   */
  public delete(id: number): Observable<null> {
    Assert.isNumber(id, 'type of id must be number');
    return this.httpClient.delete<null>(`${this.baseUrl}/${id}`);
  }
}
