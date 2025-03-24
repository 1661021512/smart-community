import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '@yunzhi/ng-common';
import {map, tap} from 'rxjs/operators';
import {VehicleType} from '../entity/vehicle-type';
import {Assert} from '@yunzhi/utils';
import {Village} from '../entity/village';

/**
 * 车辆类型service
 */

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {
  protected baseUrl = 'vehicleType';

  constructor(protected httpClient: HttpClient) {
  }

  /**
   * 分页方法
   * @param page 第几页
   * @param size 每页条数
   * @param param 查询参数
   */
  public page(page: number, size: number, param: {
    name?: string
  }): Observable<Page<VehicleType>> {
    const httpParams = new HttpParams()
      .append('page', page)
      .append('size', size)
      .append('name', param.name)
    return this.httpClient.get<Page<VehicleType>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<VehicleType>(data)));
  }

  /**
   * 删除
   */
  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id.toString()}`);
  }

  /**
   * 根据名称判断是否存在
   * id为可选参数
   * 传入id时，判断id对应实体的name是否与参数的name相同，相同返回true
   */
  nameIsAvailable(name: string, id?: number): Observable<boolean> {
    const params = new HttpParams()
      .append('name', name)
      .append('id', id);
    return this.httpClient.get<boolean>(this.baseUrl + '/nameIsAvailable', {params});
  }

  /**
   * 获取所有车辆类型
   */
  getAll(): Observable<VehicleType[]> {
    return this.httpClient.get<VehicleType[]>(`${this.baseUrl}`);
  }

  /**
   * 根据ID获取实体
   */
  public getById(id: number): Observable<VehicleType> {
    Assert.isNumber(id, 'id must be number');
    return this.httpClient.get<VehicleType>(`${this.baseUrl}/${id}`);
  }

  /**
   * 车辆类型新增
   */
  public save(vehicleType: {id: number, weight: number}): Observable<VehicleType> {
    vehicleType = vehicleType as VehicleType;
    return this.httpClient.post<VehicleType>(`${this.baseUrl}`, vehicleType);
  }

  /**
   * 更新基本信息
   * @param id id
   * @param newVehicleType 更新的车辆类型
   */
  update(id: number, newVehicleType: {name: string, weight: number}): Observable<VehicleType> {
    newVehicleType = newVehicleType as VehicleType;
    Assert.isNumber(id, 'type of id must be number');
    return this.httpClient.put<VehicleType>(`${this.baseUrl}/${id}`, newVehicleType);
  }
}
