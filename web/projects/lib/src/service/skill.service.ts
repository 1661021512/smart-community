import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {MultiSelectService} from '../../../../src/app/share/component/multi-select/multi-select.service';
import { Skill } from 'projects/lib/src/entity/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService implements MultiSelectService{
  private url = 'skill';

  constructor(private httpClient: HttpClient) {
  }

  findTop20NameContains(name: string): Observable<Skill[]> {
    const params = new HttpParams().append('name', name);
    return this.httpClient.get<Skill[]>(this.url + '/findTop20ByNameContains', {params})
      .pipe(tap(data => data.forEach(value => new Skill(value))));
  }

  findTopNameContains(name: string): Observable<{id: number; name: string}[]> {
    return this.findTop20NameContains(name);
  }

  /**
   * 新增
   * @param name 名称
   */
  save(name: string): Observable<Skill> {
    return this.httpClient.post<Skill>(this.url, {name})
      .pipe(map(value => new Skill(value)));
  }

  /**
   * 更新最后一次使用时间
   * @param id ID
   */
  updateLastUsedTime(id: number): Observable<void> {
    return this.httpClient.patch<void>(`${this.url}/updateLastUsedTime/${id}`, {});
  }
}
