import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '@yunzhi/ng-common';
import {isNotNullOrUndefined} from '@yunzhi/utils';
import {map} from 'rxjs/operators';
import {Vehicle} from '../entity/vehicle';
import {Assert} from '../utils';
import {VehicleBrandService} from './vehicle-brand.service';
import {PropertyCompany} from '../entity/property-company';

@Injectable({
  providedIn: 'root'
})
/**
 * 车辆管理service
 */
export class VehicleService {
  private url = 'vehicle';

  constructor(private httpClient: HttpClient,
              private vehicleBrandService: VehicleBrandService) {
  }

  /**
   * 删除
   */
  delete(id: number): Observable<void> {
    return this.httpClient.delete<null>(`${this.url}/${id}`);
  }

  /**
   * 根据id获取实体
   */
  getById(id: number): Observable<Vehicle> {
    Assert.isNumber(id, 'id must be number');
    return this.httpClient.get<Vehicle>(`${this.url}/${id}`);
  }

  /**
   * 分页
   * @param page 页数
   * @param size 每页大小
   * @param param 查询参数
   */
  page(page: number, size: number, param: {
    owner?: string,
    plateNumber?: string,
    villageId?: number,
    type?: number
  }): Observable<Page<Vehicle>> {

    // 定义http请求头，添加name,page和size
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('owner', isNotNullOrUndefined(param.owner) ? param.owner : '')
      .append('plateNumber', isNotNullOrUndefined(param.plateNumber) ? param.plateNumber : '')
      .append('villageId', isNotNullOrUndefined(param.villageId) ? param.villageId : '')
      .append('type', isNotNullOrUndefined(param.type) ? param.type : '');
    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 VILLAGE 对象。
    return this.httpClient.get<Page<Vehicle>>(`${this.url}/page`, {params: httpParams})
      .pipe(map(data => new Page<Vehicle>(data).toObject(d => d as Vehicle)));
  }

  /**
   * 车辆新增
   * @param vehicle 车辆
   */
  public save(vehicle: {
    owner: {id: number, name: string},
    plateNumber: string,
    brand: {id: number, name: string},
    type: {id: number},
    colour: number,
    parkingSpaceNumber: string,
    parkingSpaceType: number
  }): Observable<Vehicle> {
    vehicle = vehicle as Vehicle;
    // 若brand无id，则需要先保存该brand
    if (!vehicle.brand.id) {
      return new Observable<Vehicle>(subscriber => {
        this.vehicleBrandService.save({name: vehicle.brand.name})
          .subscribe((vehicleBrand) => {
            vehicle.brand = vehicleBrand;
            this.validate(<Vehicle>vehicle);
            this.httpClient.post<Vehicle>(`${this.url}`, vehicle)
              .subscribe({
                next: vehicle => subscriber.next(vehicle),
                complete: () => subscriber.complete()
              });
          })
      })
    } else {
      // 若bran有id，则直接保存
      this.validate(<Vehicle>vehicle);
      return this.httpClient.post<Vehicle>(`${this.url}`, vehicle);
    }
  }

  /**
   * 更新车辆信息
   * @param id id
   * @param newVehicle 更新的车辆
   */
  update(id: number, newVehicle: {
    owner: {id: number, name: string},
    plateNumber: string,
    brand: {id: number, name: string},
    type: {id: number},
    colour: number,
    parkingSpaceNumber: string,
    parkingSpaceType: number
  }): Observable<Vehicle> {
    Assert.isNumber(id, 'type of id must be number');
    newVehicle = newVehicle as Vehicle;
    // 若brand无id，则需要先保存该brand
    if (!newVehicle.brand.id) {
      return new Observable<Vehicle>(subscriber => {
        this.vehicleBrandService.save({name: newVehicle.brand.name})
          .subscribe((vehicleBrand) => {
            newVehicle.brand = vehicleBrand;
            this.validate(<Vehicle>newVehicle);
            return this.httpClient.put<Vehicle>(`${this.url}/${id}`, newVehicle)
              .subscribe({
                next: vehicle => subscriber.next(vehicle),
                complete: () => subscriber.complete()
              });
          })
      })
    } else {
      // 若bran有id，则直接保存
      this.validate(<Vehicle>newVehicle);
      return this.httpClient.put<Vehicle>(`${this.url}/${id}`, newVehicle)
    }
  }


  validate(vehicle: Vehicle) {
    // 验证数据
    Assert.isNotNullOrUndefined(
      vehicle.owner,
      vehicle.brand,
      vehicle.colour,
      vehicle.type,
      vehicle.plateNumber,
      'vehicle validate fail'
    );
    Assert.isNotNullOrUndefined(
      vehicle.owner.id,
      vehicle.type.id,
      vehicle.brand.name,
      vehicle.brand.id,
      'vehicle validate fail'
    )
  }
}
