import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReligiousBelief} from '../entity/religious-belief';

/**
 *author zhangrui
 */
@Injectable({
  providedIn: 'root'
})
export class ReligiousBeliefService {
  private url = 'religiousBelief';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 获取name为查询关键字的前10项纪录
   * @param name 宗教名称
   */
  findTop20ByNameContains(name: string): Observable<ReligiousBelief[]> {
    const params = new HttpParams().append('name', name);
    return this.httpClient.get<ReligiousBelief[]>(this.url + '/findTop20ByNameContains', {params})
  }
}
