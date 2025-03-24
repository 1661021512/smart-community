import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DistrictDataStatistics} from '../entity/district-data-statistics';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {WebUserService} from '../../../../src/service/web-user.service';

/**
 * 区域数据统计
 */
@Injectable({
  providedIn: 'root'
})
export class DistrictDataStatisticsService {
  private readonly baseUrl = 'DistrictDataStatistics'
  private cache: {
    getSonDistrictDataByDistrictId: Record<number, Observable<DistrictDataStatistics[]>>;
    getByDistrictId: Record<number, Observable<DistrictDataStatistics>>
  }

  constructor(private httpClient: HttpClient,
              private userService: WebUserService) {
    this.userService.currentLoginUser$.subscribe(() => this.initCache());
    this.initCache();
  }

  initCache() {
    this.cache = {
      getByDistrictId: {},
      getSonDistrictDataByDistrictId: {}
    };
  }

  /**
   * 获取某个区域的数据
   * 获取不到时发生404
   * @param districtId 区域ID
   */
  public getByDistrictId(districtId: number): Observable<DistrictDataStatistics | null> {
    if (!this.cache.getByDistrictId[districtId]) {
      this.cache.getByDistrictId[districtId] =
        this.httpClient.get<DistrictDataStatistics>(this.baseUrl + '/getByDistrictId/' + districtId).pipe(shareReplay(1));
    }
    return this.cache.getByDistrictId[districtId];
  }

  /**
   * 获取子区域的统计数据
   * @param districtId 区域ID
   */
  getSonDistrictDataByDistrictId(districtId: number): Observable<DistrictDataStatistics[]> {
    if (!this.cache.getSonDistrictDataByDistrictId[districtId]) {
      this.cache.getSonDistrictDataByDistrictId[districtId] =
        this.httpClient.get<DistrictDataStatistics[]>(this.baseUrl + '/getSonDistrictDataByDistrictId/' + districtId).pipe(shareReplay(1));
    }
    return this.cache.getSonDistrictDataByDistrictId[districtId];
  }
}
