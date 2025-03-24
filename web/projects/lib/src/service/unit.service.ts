import {Injectable} from '@angular/core';
import {Unit} from '../entity/unit';
import {Observable} from 'rxjs';
import {Assert} from '@yunzhi/utils';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  baseUrl = 'unit';
  private name = 'Unit: ';

  constructor(private httpClient: HttpClient) {
  }

  update(id, unit: Unit): Observable<Unit> {
    return this.httpClient.put<Unit>(`${this.baseUrl}/${id}`, unit)
      .pipe(map(data => new Unit(data)));
  }

  /**
   * 新建单元
   */
  public save(unit: {
    name: string,
    weight: number,
    building: {id: number}
  }): Observable<Unit> {
    return this.httpClient.post<Unit>(`${this.baseUrl}`, {
      name: unit.name,
      weight: unit.weight,
      building: unit.building
    } as Unit)
      .pipe(map(data => new Unit(data)));
  }

  /**
   * 获取楼中所有单元
   * Author zhangrui
   */
  public getByBuilding(buildingId: number): Observable<Array<Unit>> {
    Assert.isNumber(buildingId, this.name + 'buildingId must be number');
    console.log('service中buildingId：' + buildingId);
    return this.httpClient.get<Array<Unit>>(`${this.baseUrl}/getByBuildingId/${buildingId}`);
    //.pipe(map(units => units.map((unit => new Unit(unit)))));
  }

  getById(id: number): Observable<Unit> {
    Assert.isInteger(id, this.name + 'id must be number');
    return this.httpClient.get<Unit>(`${this.baseUrl}/${id}`);
  }
}
