import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Enterprise} from '../entity/enterprise';

/**
 * 企事业单位
 */
@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {
  private url = 'enterprise';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 获取以name为查询关键字的前20项记录
   * @param name 单位名称
   */
  findTop20ByNameContains(name: string): Observable<Enterprise[]> {
    const params = new HttpParams().append('name', name);
    return this.httpClient.get<Enterprise[]>(this.url + '/findTop20ByNameContains',
      {params})
  }
}
