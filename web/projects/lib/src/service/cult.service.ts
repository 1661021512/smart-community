import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cult} from "../entity/cult";
import {map} from "rxjs/operators";

/**
 * 邪教
 */
@Injectable({
  providedIn: 'root'
})
export class CultService {
  private url = 'cult';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 获取以name为查询关键字的前20项记录
   * @param name 单位名称
   */
  getTop20ByNameContains(name: string): Observable<Cult[]> {
    const params = new HttpParams().append('name', name);
    return this.httpClient.get<Cult[]>(this.url + '/getTop20ByNameContains',
      {params})
  }

  findTopNameContains(name: string): Observable<{id: number; name: string}[]> {
    return this.getTop20ByNameContains(name);
  }
  /**
   * 新增
   * @param name 名称
   */
  save(name: string): Observable<Cult> {
    return this.httpClient.post<Cult>(this.url, {name})
      .pipe(map(value => new Cult(value)));
  }
  /**
   * 更新最后一次使用时间
   * @param id ID
   */
  updateLastUsedTime(id: number): Observable<void> {
    return this.httpClient.patch<void>(`${this.url}/updateLastUsedTime/${id}`, {});
  }
}
