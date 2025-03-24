import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResidentRelationships} from '../entity/resident-relationships';
import {Observable} from 'rxjs';
import {Assert} from '@yunzhi/utils';

/**
 * 居民间关系
 */
@Injectable({
  providedIn: 'root'
})
export class ResidentRelationshipsService {
  private readonly url = 'residentRelationships';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 查询某个居民为起点的所有的关系
   * @param residentId 居民ID
   */
  getFromAllByResidentId(residentId: number): Observable<ResidentRelationships[]> {
    return this.httpClient.get<ResidentRelationships[]>(this.url + '/getFromAllByResidentId/' + residentId);
  }

  public save(residentRelationships: ResidentRelationships): Observable<ResidentRelationships> {
    return this.httpClient.post<ResidentRelationships>(this.url, residentRelationships);
  }

  /**
   * 更新两个居民间的关系
   * @param id 居民间关系
   * @param oneResidentId 一个居民
   * @param anotherResidentId 另一个居民
   */
  updateBetweenTwoResidents(id: number, oneResidentId: number, anotherResidentId: number): Observable<void> {
    Assert.isNumber(id, '请选择居民间关系');
    Assert.isNumber(oneResidentId, anotherResidentId, '传入的居民ID不正确');
    return this.httpClient.put<void>(`${this.url}/updateBetweenTwoResidents`, {
      relationshipId: id,
      oneResidentId: oneResidentId,
      anotherResidentId: anotherResidentId
    });
  }
}
