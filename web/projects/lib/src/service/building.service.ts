import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {concat, Observable} from 'rxjs';
import {Building} from '../entity/building';
import {map, tap} from 'rxjs/operators';
import {Page} from '@yunzhi/ng-common';
import {Assert} from '@yunzhi/utils';
import {DistrictService} from './district.service';
import {HouseType} from '../entity/enum/house-type';
import {Unit} from '../entity/unit';
import {House} from '../entity/house';
import {UnitService} from './unit.service';
import {HouseService} from './house.service';

@Injectable({
  providedIn: 'root'
})
/**
 * 住宅楼M层
 */
export class BuildingService {
  private url = 'building';

  constructor(private httpClient: HttpClient,
              private unitService: UnitService,
              private houseService: HouseService,
              private districtService: DistrictService) {
  }

  public batchSaveUnitsWithHouses(id: number, units: Unit[]): Observable<void> {
    Assert.isNumber(id, 'id must be number');
    Assert.isArray(units, 'units must be array');
    return new Observable<void>(subscriber => {
      // 新建units并向后台发起请求
      let observables: Observable<Unit>;
      units.forEach((value, index) => {
        value.weight = index;
        Assert.isString(value.name, '单元名称类型不是字符串');
        Assert.isInteger(value.weight, '单元权重类型不是number');
        const unit = {
          building: {id},
          name: value.name,
          weight: value.weight
        } as Unit;
        const request = this.unitService.save(unit).pipe(map(v => {
          Assert.isInteger(v.id, '在返回值未接收到id或接收的值类型不是number');
          value.id = v.id;
          return value;
        }));
        if (typeof observables === 'undefined') {
          observables = request;
        } else {
          observables = concat(observables, request);
        }
      });

      // 批量保存house信息
      let houses = [] as House[];
      observables.subscribe({
        next: unit => {
          unit.houses.forEach(house => {
            Assert.isString(house.name, '房屋名称未设置');
            house.unit = {id: unit.id} as Unit;
          });
          houses = houses.concat(unit.houses);
        },
        complete: () => {
          this.houseService.saveAll(houses)
            .subscribe(() => {
              subscriber.next();
              subscriber.complete();
            });
        }
      });
    });

  }

  /**
   * 删除
   */
  public delete(id: number): Observable<null> {
    Assert.isNumber(id, 'type of id must be number');
    return this.httpClient.delete<null>(`${this.url}/${id}`)
      .pipe(tap(() => {
        this.districtService.clearCache()
      }));
  }

  /**
   * 根据ID获取实体
   */
  public getById(id: number): Observable<Building> {
    Assert.isNumber(id, 'id must be number');
    return this.httpClient.get<Building>(`${this.url}/${id}`)
      .pipe(map(data => new Building(data)));
  }

  /**
   * 获取携带单元、住房以及居民的楼栋信息
   * @param id ID
   */
  getByIdWithUnitsToResidents(id: number): Observable<Building> {
    Assert.isInteger(id, '楼栋、排ID类型不正确');
    return this.httpClient.get<Building>(this.url + '/getByIdWithUnitsAndResidents/' + id)
      .pipe(tap(building => {
        if (Array.isArray(building.units)) {
          building.units.forEach(unit => {
            if (Array.isArray(unit.houses)) {
              unit._floors = Unit.getFloors(unit.houses);
            }
          })
        }
      }));
  }

  getByVillage(villageId: number): Observable<Array<Building>> {
    Assert.isNumber(villageId, 'villageId must be number');
    return this.httpClient.get<Array<Building>>(`${this.url}/getByVillageId/${villageId}`);
  }

  /**
   * 函数page
   * @param param 查询参数,page , size , villageId 小区ID
   * 函数类型为Observable<Page<Building>>
   */
  public page(param: {page: number, size: number, villageId: number, houseType: HouseType}): Observable<Page<Building>> {
    // 定义http请求头，添加page和size
    const httpParams = new HttpParams()
      .append('page', param.page)
      .append('size', param.size)
      .append('villageId', param.villageId)
      .append('houseType', param.houseType);

    // 返回 根据相应连接订阅的数据，将数据中的每一个JSON对象转换为 Building 对象
    return this.httpClient.get<Page<Building>>(`${this.url}/page`, {params: httpParams})
      .pipe(map(data => new Page<Building>(data).toObject(o => new Building(o))));
  }

  /**
   * 新建住宅
   * @param building 住宅
   */
  save(building: Building): Observable<Building> {
    return this.httpClient.post<Building>(`${this.url}`, building)
      .pipe(map(data => new Building(data)))
      .pipe(tap(() => {
        this.districtService.clearCache()
      }));
  }

  /**
   * 更新
   */
  update(id: number, building: Building): Observable<Building> {
    Assert.isNumber(id, 'id must be number');
    return this.httpClient.put<Building>(`${this.url}/${id}`, building)
      .pipe(map(data => new Building(data)))
      .pipe(tap(() => {
        this.districtService.clearCache()
      }));
  }
}
