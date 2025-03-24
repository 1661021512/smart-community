import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WebUserDataStatistics} from '../entity/web-user-data-statistics';
import {Page} from '@yunzhi/ng-common';

@Injectable({
  providedIn: 'root'
})
export class UserDataStatisticsService {
  private readonly baseUrl = 'UserDataStatistics';

  constructor(private httpClient: HttpClient) {
  }

  pageTop10BelongDistrictId(districtId: number): Observable<Page<WebUserDataStatistics>> {
    const httpParams = new HttpParams()
      .append('page', 0)
      .append('size', 10)
      .append('sort', 'enterCount,desc');
    return this.httpClient.get<Page<WebUserDataStatistics>>(this.baseUrl + '/pageByBelongDistrictId/' + districtId,
      {params: httpParams});
  }
}
