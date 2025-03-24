import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {VolunteerActivitySignUp} from '../entity/volunteer-activity-sign-up';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

/**
 * 报名信息service
 */
@Injectable({
  providedIn: 'root'
})
export class SignUpInformationService {

  protected baseUrl = 'signUpInformation'

  constructor(protected httpClient: HttpClient,) {
  }

  /**
   * 报名信息新增，提交报名信息
   * @param signUpInformation 报名信息
   */
  public save(signUpInformation: VolunteerActivitySignUp): Observable<VolunteerActivitySignUp> {
    // 向后台请求,并通过管道返回User对象
    return this.httpClient.post<VolunteerActivitySignUp>(`${this.baseUrl}`, signUpInformation)
      .pipe(map(data => data as VolunteerActivitySignUp));
  }
}
