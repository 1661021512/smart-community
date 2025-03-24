import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

/**
 * 调度（用于手动触发后台的统计方法，主要用于测试或演示）
 */
@Injectable({
  providedIn: 'root'
})
export class ScheduledService {
  private readonly baseUrl = 'scheduled';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 清除昨天生成的excel表
   */
  clearYesterdayExcelFile(): Observable<void> {
    return this.httpClient.get<void>(this.baseUrl + '/clearYesterdayExcelFile');
  }

  /**
   * 更新录入数据
   */
  updateEnterData(): Observable<void> {
    return this.httpClient.get<void>(this.baseUrl + '/updateEnterData');
  }

  /**
   * 重新生成区域统计数据(居民数量、住房数量、接种率等)
   */
  reGenerateDistrictData(): Observable<void> {
    return this.httpClient.get<void>(this.baseUrl + '/reGenerateDistrictData');
  }

  /**
   * 重新生成用户录入数据数量
   * <p>
   *   该方法冗余了，回头删除一个
   */
  reGenerateUserData(): Observable<void> {
    return this.httpClient.get<void>(this.baseUrl + '/reGenerateUserData');
  }
}
