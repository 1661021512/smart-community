import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DistrictHouseResidentCount} from '../entity/district-house-resident-count';
import {Page} from "@yunzhi/ng-common";
import {isNotNullOrUndefined} from "@yunzhi/utils";
import {map} from "rxjs/operators";
import {Statistics} from "../entity/statistics";

/**
 * 数据统计
 */
@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private url = 'statistics';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 获取当前登录用户所在区域的子区域的住房与居民的总数
   */
  getSonDistrictHouseAndResidentCountOfCurrentUser(): Observable<DistrictHouseResidentCount[]> {
    return this.httpClient.get<DistrictHouseResidentCount[]>(this.url + '/getSonDistrictHouseAndResidentCountOfCurrentUser');
  }

  /**
   * 分页
   */
  pageOfLast(page: number, size: number, param?: {
    userName?: string
  }): Observable<Page<Statistics>> {
    // 定义http请求头，添加page和size
    // 查询条件 name
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('userName', isNotNullOrUndefined(param.userName) ? param.userName : '')
      .append('sort', 'totalCount,desc');

    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 Statistics 对象。
    return this.httpClient.get<Page<Statistics>>(`${this.url}/pageOfLast`, {params: httpParams})
      .pipe(map(data => new Page<Statistics>(data).toObject(o => new Statistics(o))));
  }
}
