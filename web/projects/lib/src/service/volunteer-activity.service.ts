import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Assert, isNotNullOrUndefined, Utils} from '@yunzhi/utils';
import {Page} from '@yunzhi/ng-common';
import {VolunteerActivity} from 'projects/lib/src/entity/volunteer-activity';
import {map} from 'rxjs/operators';
import {YzHttpParams} from '../modal/yz-http-params';
import {VolunteerActivitySignUp} from '../entity/volunteer-activity-sign-up';
import {Attachment} from "../entity/attachment";

/**
 * 志愿者活动
 */
@Injectable({
  providedIn: 'root'
})
export class VolunteerActivityService {
  protected baseUrl = 'volunteerActivity';

  constructor(protected httpClient: HttpClient) {
  }

  /**
   * 活动是否过期
   * @param volunteerActivity 活动
   */
  public static isExpired(volunteerActivity: VolunteerActivity): boolean {
    const now = new Date().getTime();
    const endDate = Utils.intDateToTimestamp(volunteerActivity.endDate);
    return now > endDate;
  }

  /**
   * 活动报名
   * @param id 活动ID
   */
  signUp(id: number): Observable<VolunteerActivitySignUp> {
    return this.httpClient.post<VolunteerActivitySignUp>(this.baseUrl + '/applyOfCurrentVolunteer/' + id, {});
  }

  /**
   * 分页方法
   * @param page 第几页
   * @param size 每页条数
   * @param param 查询参数
   */
  public page(page: number, size: number, param: {
    name?: string, endDate?: number, state?: number, todayDate?: number,contact?: string, initiator?: string,
    place?: string, scale?: number
  }): Observable<Page<VolunteerActivity>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('name', isNotNullOrUndefined(param.name) ? param.name : '')
      .append('endDate', isNotNullOrUndefined(param.endDate) ? param.endDate : '')
      .append('state', isNotNullOrUndefined(param.state) ? param.state : '')
      .append('todayDate', isNotNullOrUndefined(param.todayDate) ? param.todayDate : '')
      .append('contact', isNotNullOrUndefined(param.contact) ? param.contact : '')
      .append('initiator', isNotNullOrUndefined(param.initiator) ? param.initiator : '')
      .append('place', isNotNullOrUndefined(param.place) ? param.place : '')
      .append('scale', isNotNullOrUndefined(param.scale) ? param.scale : '');
    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 User 对象。

    return this.httpClient.get<Page<VolunteerActivity>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<VolunteerActivity>(data)));
  }

  /**
   * 删除
   */
  public delete(volunteerActivityId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.baseUrl}/${volunteerActivityId.toString()}`);
  }

  /**
   * 新增志愿者活动
   */
  save(volunteerActivity: VolunteerActivity): Observable<VolunteerActivity> {

    Assert.isString(
      volunteerActivity.name,
      volunteerActivity.contact,
      volunteerActivity.place,
      volunteerActivity.detail,
      '000 type of some properties must be string');
    Assert.isNumber(
      volunteerActivity.endDate,
      volunteerActivity.numberOfPlanned,
      '111 type of some properties must be number');

    return this.httpClient.post<VolunteerActivity>(`${this.baseUrl}/add`, volunteerActivity);
  }

  public getById(id: number): Observable<VolunteerActivity> {
    return this.httpClient.get<VolunteerActivity>(`${this.baseUrl}/${id.toString()}`);
  }

  /**
   * 小程序端分页
   * @param page 页码
   * @param size 每页大小
   * 按发布时间排序
   */
  wechatPage(page: number, size: number): Observable<Page<VolunteerActivity>> {
    const params = new YzHttpParams()
      .append('page', page)
      .append('size', size);
    return this.httpClient.get<Page<VolunteerActivity>>(this.baseUrl + '/wechatPage',
      {params}).pipe(map(data => new Page<VolunteerActivity>(data)));
  }

  /**
   * 更新志愿者活动
   * @param id id
   * @param volunteerActivity 志愿者活动
   */
  update(id: number, volunteerActivity: {image: Attachment,
    endDate: number,
    contact: string,
    initiator: string,
    name: string,
    numberOfPlanned: number,
    place: string,
    detail: string}): Observable<VolunteerActivity> {
    Assert.isString(
      volunteerActivity.name,
      volunteerActivity.contact,
      volunteerActivity.place,
      volunteerActivity.detail,
      volunteerActivity.initiator,
      'type of name, contact, place, detail or initiator must be string');
    Assert.isNumber(
      volunteerActivity.endDate,
      volunteerActivity.numberOfPlanned,
      'type of sendDate or numberOfPlanned must be number');

    return this.httpClient.put<VolunteerActivity>(`${this.baseUrl}/${id.toString()}`, volunteerActivity);
  }
}
