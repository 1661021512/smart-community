import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Page} from "@yunzhi/ng-common";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {VehicleBrand} from "../entity/vehicle-brand";
import {Assert} from "@yunzhi/utils";

/**
 * 车辆品牌
 */
@Injectable({
  providedIn: 'root'
})
export class VehicleBrandService {
  protected baseUrl = 'vehicleBrand';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 删除
   */
  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id.toString()}`);
  }

  /**
   * 根据名称判断是否存在
   */
  existByName(name: string): Observable<boolean> {
    const params = new HttpParams().append('name', name);
    return this.httpClient.get<boolean>(this.baseUrl + '/existByName', {params});
  }

  /**
   * 根据name获取车辆品牌,如果没有获取到，那么先将该name作为车辆品牌实体保存，再返回车辆品牌实体
   */
  getByNameIfNotExistThenSave(name: string): Observable<VehicleBrand> {
    const params = new HttpParams().append('name', name);
    return this.httpClient.get<VehicleBrand>(`${this.baseUrl}/getByNameIfNotExistThenSave`, {params});
  }

  /**
   * 分页方法
   * @param page 第几页
   * @param size 每页条数
   * @param param 查询参数
   */
  public page(page: number, size: number, param: {
    name?: string
  }): Observable<Page<VehicleBrand>> {
    const httpParams = new HttpParams()
      .append('page', page)
      .append('size', size)
      .append('name', param.name)
    return this.httpClient.get<Page<VehicleBrand>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<VehicleBrand>(data)));
  }

  /**
   * 保存
   */
  public save(vehicleBrand: {name: string}): Observable<VehicleBrand> {
    vehicleBrand = vehicleBrand as VehicleBrand;
    return this.httpClient.post<VehicleBrand>(`${this.baseUrl}`, vehicleBrand);
  }

  /**
   * 更新
   */
  public update(id: number, vehicleBrand: {name: string}): Observable<VehicleBrand> {
    vehicleBrand = vehicleBrand as VehicleBrand;
    Assert.isNumber(id, 'type of id must be number');
    return this.httpClient.put<VehicleBrand>(`${this.baseUrl}/${id}`, vehicleBrand)
  }

}
