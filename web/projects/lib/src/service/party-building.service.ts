import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Assert} from '@yunzhi/utils';
import {PartyBuilding} from 'projects/lib/src/entity/partyBuilding';

/**
 * 党建(组织)信息
 */
@Injectable({
  providedIn: 'root'
})
export class PartyBuildingService {

  protected baseUrl = 'partyBuilding';

  constructor(protected httpClient: HttpClient,
  ) {
  }

  /**
   * 当前登录用户所在区域的所有党建记录
   */
  getAllOfCurrentUserDistrict(): Observable<PartyBuilding[]> {
    return this.httpClient.get<PartyBuilding[]>(this.baseUrl + '/getAllOfCurrentUserDistrict');
  }

  /**
   * 职务人员新增
   */
  public save(partBuilding: PartyBuilding): Observable<PartyBuilding> {
    // 向后台请求,并通过管道返回User对象
    return this.httpClient.post<PartyBuilding>(`${this.baseUrl}`, partBuilding);
  }

  /**
   * 根据districtId获取该区域内党建人员信息
   */
  public getAllByDistrictId(districtId: number): Observable<Array<PartyBuilding>> {
    Assert.isInteger(districtId, '传入的类型必须是数字');
    return this.httpClient.get<Array<PartyBuilding>>(`${this.baseUrl}/getAllByDistrictId/${districtId.toString()}`);
  }

  public getByDutyIdOfCurrentDistrict(dutyId: number): Observable<PartyBuilding> {
    return this.httpClient.get<PartyBuilding>(this.baseUrl + '/getByDutyIdOfCurrentDistrict/' + dutyId);
  }

  saveOfCurrentDistrict(partBuilding: PartyBuilding): Observable<void> {
    return this.httpClient.post<void>(this.baseUrl + '/saveOfCurrentDistrict', partBuilding);
  }

  getById(id: number): Observable<PartyBuilding> {
    return this.httpClient.get<PartyBuilding>(this.baseUrl + '/' + id);
  }

  update(id: number, partBuilding: PartyBuilding): Observable<void> {
    return this.httpClient.patch<void>(this.baseUrl + '/' + id, partBuilding);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.baseUrl + '/' + id);
  }
}
