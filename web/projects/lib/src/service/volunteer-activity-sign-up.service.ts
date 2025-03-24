import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {VolunteerActivitySignUp} from '../entity/volunteer-activity-sign-up';

/**
 * 志愿者活动报名信息
 */
@Injectable({
  providedIn: 'root'
})
export class VolunteerActivitySignUpService {
  private url = 'VolunteerActivitySignUp';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 审核通过
   * @param id 志愿者活动ID
   */
  public approved(id: number): Observable<VolunteerActivitySignUp> {
    return this.httpClient.patch<VolunteerActivitySignUp>(this.url + '/approved/' + id, {});
  }

  /**
   * 当前登录微信用户是否已报名某个活动
   * @param volunteerActivityId 活动ID
   */
  public existsByVolunteerActivityIdOfCurrentWechatUser(volunteerActivityId: number): Observable<boolean> {
    return this.httpClient
      .get<boolean>(this.url + '/existsByVolunteerActivityIdOfCurrentWechatUser/' + volunteerActivityId);
  }

  /**
   * 获取某个志愿者活动的所有报名信息
   * @param activityId 志愿者活动ID
   */
  getAllByVolunteerActivityId(activityId: number): Observable<VolunteerActivitySignUp[]> {
    return this.httpClient
      .get<VolunteerActivitySignUp[]>(this.url + '/getAllByVolunteerActivityId/' + activityId);
  }

  /**
   * 获取当前登录用户对某个活动的报名情况
   * @param activityId 志愿者活动
   */
  public getByActivityIdOfCurrentWechatUser(activityId: number): Observable<VolunteerActivitySignUp> {
    return this.httpClient
      .get<VolunteerActivitySignUp>(this.url + '/getByActivityIdOfCurrentWechatUser/' + activityId);
  }

  /**
   * 拒绝
   * @param id 志愿者活动ID
   */
  public refused(id: number) {
    return this.httpClient.patch<VolunteerActivitySignUp>(this.url + '/refused/' + id, {});
  }
}
