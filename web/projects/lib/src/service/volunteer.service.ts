import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Page} from '@yunzhi/ng-common';
import {map} from 'rxjs/operators';
import {Volunteer} from '../entity/volunteer';
import {EducationType} from '../entity/enum/education-type';


@Injectable({
  providedIn: 'root'
})
/**
 * 志愿者M层
 */
export class VolunteerService {
  protected baseUrl = 'volunteer';

  constructor(protected httpClient: HttpClient) {
  }

  /**
   * 分页方法
   * @param page 第几页
   * @param size 每页条数
   * @param param 查询参数
   */
  public page(page: number, size: number, param: {
    name?: string, sex?: boolean, ageBegin?: number,
    ageEnd?: number, volunteerActivity?: string, education?: EducationType, beStar?: boolean
  }): Observable<Page<Volunteer>> {
    console.log(page, 'page');
    console.log(size, 'size');
    const httpParams = new HttpParams()
      .append('page', page)
      .append('size', size)
      .append('name', param.name)
      .append('sex', param.sex)
      .append('beginAge', param.ageBegin)
      .append('endAge', param.ageEnd)
      .append('volunteerActivity', param.volunteerActivity)
      .append('education', param.education)
      .append('beStar', param.beStar)
    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 User 对象。
    return this.httpClient.get<Page<Volunteer>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<Volunteer>(data)));
  }

  /**
   * 取消明星
   * @param id 志愿者Id
   */

  cancelStar(id: number): Observable<Volunteer> {
    return this.httpClient.patch<Volunteer>(`${this.baseUrl}/cancelStar/${id}`, {});
  }

  /**
   * 当前登录的用户是否已经是志愿者
   */
  existsByCurrentWechatUser(): Observable<boolean> {
    return this.httpClient.get<boolean>(this.baseUrl + '/existsByCurrentWechatUser');
  }

  /**
   * 获取志愿者明星
   * 按权重由小到大进行排序，当权重相同时，按设置为明星的时间进行排序
   */
  getAllVolunteerStars(): Observable<Volunteer[]> {
    return this.httpClient.get<Volunteer[]>(`${this.baseUrl}/getAllVolunteerStars`);
  }

  /**
   * 获取当前的志愿者
   */
  getCurrentVolunteer(): Observable<Volunteer> {
    return this.httpClient.get<Volunteer>(this.baseUrl + '/getCurrentVolunteer');
  }

  /**
   * 根据username(电话号码)获取volunteer
   * @param username 用户名
   */
  public getVolunteerByUsername(username: string): Observable<Volunteer> {
    const params = new HttpParams().append('username', username);
    return this.httpClient.get<Volunteer>(this.baseUrl + '/getByUsername', {params});
  }

  /**
   * 志愿者新增
   */
  public save(volunteer: Volunteer): Observable<Volunteer> {
    // 向后台请求,并通过管道返回Volunteer对象
    return this.httpClient.post<Volunteer>(`${this.baseUrl}`, volunteer)
      .pipe(map(data => data as Volunteer));
  }

  public saveOfCurrentWechatUser(volunteer: {phone: string}): Observable<Volunteer> {
    return this.httpClient.post<Volunteer>(this.baseUrl + '/saveOfCurrentWechatUser', volunteer);
  }

  /**
   * 设置为服务明星
   * @param id 志愿者ID
   * @param weight 权重（排名）
   */
  setStar(id: number, weight: number): Observable<Volunteer> {
    return this.httpClient.patch<Volunteer>(`${this.baseUrl}/setStar/${id}`, {weight} as Volunteer);
  }

  /**
   * 更新当前志愿者的手机号
   * @param phone 手机号码
   */
  public updateCurrentVolunteerPhone(phone: string): Observable<Volunteer> {
    return this.httpClient.put<Volunteer>(this.baseUrl + '/updateCurrentVolunteerPhone', {phone});
  }

  /**
   * 更新排名
   * @param id ID
   * @param weight 权重（排名）
   */
  updateWeight(id: number, weight: number): Observable<Volunteer> {
    return this.httpClient.patch<Volunteer>(`${this.baseUrl}/updateWeight/${id}`, {weight} as Volunteer);
  }
}
