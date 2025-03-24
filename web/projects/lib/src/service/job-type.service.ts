import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {JobType} from '../entity/jobType';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {MultiSelectService} from '../../../../src/app/share/component/multi-select/multi-select.service';

@Injectable({
  providedIn: 'root'
})
export class JobTypeService implements MultiSelectService {
  private url = 'jobType';

  constructor(private httpClient: HttpClient) {
  }

  findTop20ByNameContains(name: string): Observable<JobType[]> {
    const params = new HttpParams().append('name', name);
    return this.httpClient.get<JobType[]>(this.url + '/findTop20ByNameContains', {params})
      .pipe(tap(data => data.forEach(value => new JobType(value))));
  }

  findTopNameContains(name: string): Observable<{id: number; name: string}[]> {
    return this.findTop20ByNameContains(name);
  }

  /**
   * 新增
   * @param name 名称
   */
  save(name: string): Observable<JobType> {
    return this.httpClient.post<JobType>(this.url, {name})
      .pipe(map(value => new JobType(value)));
  }

  /**
   * 更新最后一次使用时间
   * @param id ID
   */
  updateLastUsedTime(id: number): Observable<void> {
    return this.httpClient.patch<void>(`${this.url}/updateLastUsedTime/${id}`, {});
  }
}
