import {Injectable} from '@angular/core';
import {Assert} from '@yunzhi/utils';
import {
  Page
} from '@yunzhi/ng-common';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable,} from 'rxjs';
import {House} from 'projects/lib/src/entity/house';
import {map} from 'rxjs/operators';
import {DISTRICT_TYPE, DistrictType} from '../entity/enum/district-type';
import {House_TYPE, HouseType} from '../entity/enum/house-type';
import {UnitService} from './unit.service';
import {Unit} from '../entity/unit';
import {Building} from '../entity/building';
import {YzHttpParams} from '../modal/yz-http-params';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  protected baseUrl = 'house';

  constructor(protected httpClient: HttpClient,
              private unitService: UnitService) {
  }

  static generateHouses(maxFloor: number, housesLengthPerFloor): House[] {
    const houses = [] as House[];
    for (let j = 0; j < maxFloor; j++) {
      for (let k = 0; k < housesLengthPerFloor; k++) {
        const house = {
          name: k < 9 ? `${j + 1}0${k + 1}` : `${j + 1}${k + 1}`,
          weight: k,
          floor: j
        } as House;
        houses.push(house);
      }
    }
    return houses;
  }

  /**
   * 根据传入的类型获取房子的地址全称
   * 比如类型为县，则显示地址为：xxx镇 xxx社区 xx小区 xx楼 xx单元 xx号
   * @param house 房子
   * @param type 类型
   * @param connector 连接符号
   */
  static getFullNameWithType(house: House, type: DistrictType, connector = ' '): string {
    Assert.isDefined(house, 'house must be defined');
    Assert.isDefined(house.unit, house.name, 'house property must be defined');

    let result = house.unit.name + connector + house.name;
    if (type === DISTRICT_TYPE.building.value) {
      return result;
    }

    Assert.isDefined(house.unit.building, 'house.unit.building must be defined');
    Assert.isDefined(house.unit.building.name, house.unit.building.village, 'house.unit.building.name must be defined');
    result = house.unit.building.name + connector + result;
    if (type === DISTRICT_TYPE.village.value) {
      return result;
    }

    Assert.isDefined(house.unit.building.village.name, house.unit.building.village.community, 'house.unit.building.village.name must be defined');
    result = house.unit.building.village.name + connector + result;
    if (type === DISTRICT_TYPE.community.value) {
      return result;
    }
    Assert.isDefined(house.unit.building.village.community.name, house.unit.building.village.community.town,
      'house.unit.building.village.community must be defined');
    result = house.unit.building.village.community.name + connector + result;
    if (type === DISTRICT_TYPE.town.value) {
      return result;
    }

    Assert.isDefined(house.unit.building.village.community.town.name,
      'house.unit.building.village.community.name must be defined');
    result = house.unit.building.village.community.town.name + connector + result;
    return result;
  }

  /**
   * 添加网格员
   * @param id ID
   * @param griderId 网格员ID
   */
  addGrider(id: number, griderId: number): Observable<void> {
    const httpParams = new HttpParams().append('griderId', griderId);
    return this.httpClient.post<void>(`${this.baseUrl}/addGrider/${id}`, {}, {params: httpParams});
  }

  /**
   * 批量删除
   * @param ids 删除的ids
   */
  batchRemoveGrider(ids: number[]): Observable<void> {
    return this.httpClient.delete<void>(this.baseUrl + '/batchRemoveGrider', {body: ids});
  }

  /**
   * 删除
   */
  delete(houseId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.baseUrl}/${houseId.toString()}`);
  }

  /**
   * 获取某个building下的所有住房
   * @param buildingId 楼ID
   * @author panjie
   */
  getAllByBuildingId(buildingId: number): Observable<House[]> {
    Assert.isNumber(buildingId, 'type of buildingId must be number');
    return this.httpClient.get<House[]>(`${this.baseUrl}/getAllByBuildingId/${buildingId}`);
  }

  /**
   * 根据ID获取实体
   */
  public getById(id: number): Observable<House> {
    Assert.isNumber(id, 'id must be number');
    return this.httpClient.get<House>(`${this.baseUrl}/${id}`);
  }

  /**
   * 分页方法
   * @param page 第几页
   * @param size 每页条数
   * @param param 查询参数 beAssignedGrider:是否指定了网格员;
   * excludeGriderId:结果中不包括的网格员ID;
   * isExcludedGriderIsNotNull:是否排除网格员非空的
   */
  page(page: number, size: number, param: {
    owner?: string,
    houseType?: number,
    griderId?: number,
    villageId?: number,
    isExcludedGriderIsNotNull?: boolean,
    excludedGriderId?: number,
    buildingId?: number,
    unitId?: number
  }): Observable<Page<House>> {
    const httpParams = new YzHttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('owner', param.owner)
      .append('houseType', param.houseType)
      .append('griderId', param.griderId)
      .append('villageId', param.villageId)
      .append('buildingId', param.buildingId)
      .append('isExcludedGriderIsNotNull', param.isExcludedGriderIsNotNull)
      .append('excludedGriderId', param.excludedGriderId)
      .append('unitId', param.unitId);

    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 User 对象。
    return this.httpClient.get<Page<House>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<House>(data)));
  }

  /**
   * 当前网格员管理的住房
   * @param page 第几页
   * @param size 每页大小
   * @param param 查询参数
   */
  pageOfCurrentGrider(page: number, size: number, param: {
    owner?: string,
    houseType?: number,
    villageId?: number,
    buildingId?: number,
    unitId?: number
  }): Observable<Page<House>> {
    const params = new YzHttpParams()
      .append('page', page)
      .append('size', size)
      .append('owner', param.owner)
      .append('houseType', param.houseType)
      .append('villageId', param.villageId)
      .append('buildingId', param.buildingId)
      .append('unitId', param.unitId);

    return this.httpClient.get<Page<House>>(`${this.baseUrl}/pageOfCurrentGrider`, {params});
  }

  /**
   * 由当前网格员上移除管理的房屋
   * @param houseId 房屋
   */
  removeByCurrentGrider(houseId: number): Observable<void> {
    Assert.isInteger(houseId, 'houseId类型必须是number');
    return this.httpClient.patch<void>(`${this.baseUrl}/removeByCurrentGrider/${houseId}`, {});
  }

  /**
   * 移除网格员
   * @param id ID
   */
  removeGrider(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/removeGrider/${id}`, {});
  }

  save(house: House, houseType: HouseType, buildingId: number): Observable<House> {
    // 增加新平房时，需要先为该平房增加一个单元(unit)，然后有了单元以后，再新增住房
    if (houseType === House_TYPE.bungalow.value) {
      return new Observable<House>(subscriber => {
        // 新增一个权重为0 名字与住房名字相同的单元
        this.unitService.save({
          name: '',
          weight: house.weight,
          building: {id: buildingId} as Building
        } as Unit).subscribe(data => {
          house = {...house, ...{unit: data}}
          this.httpClient.post<House>(this.baseUrl, house)
            .subscribe({
              next: house => subscriber.next(house),
              complete: () => subscriber.complete()
            });
        })
      });
    }
    // 若为楼房，则直接添加
    else {
      return this.httpClient.post<House>(this.baseUrl, house);
    }
  }

  saveAll(houses: House[]): Observable<House[]> {
    return this.httpClient.post<House[]>(`${this.baseUrl}/saveAll`, houses);
  }

  /**
   * 更新基本信息
   * @param id id
   * @param house 更新的房子
   */
  update(id: number, house: {
    type: number,
    area: number,
    lowIncoming: boolean,
    relief: boolean,
    checkInTime: number,
    remarks: string,
    weight: number,
  }): Observable<House> {
    Assert.isNumber(id, 'type of id must be number');
    return this.httpClient.put<House>(`${this.baseUrl}/${id}`, house);
  }

  /**
   * 更新名称
   */
  updateName(id: number, name: string): Observable<House> {
    Assert.isNumber(id, 'type of id must be number');
    const data = {name};
    return this.httpClient.put<House>(`${this.baseUrl}/updateName/${id}`, data);
  }

  /**
   * 更新户主信息
   * @param houseId 房子
   * @param residentId 居民
   * @param isOwner 是否户主
   */
  updateOwner(houseId: number, residentId: number, isOwner: boolean): Observable<void> {
    return this.httpClient.patch<void>(`${this.baseUrl}/updateOwner/${houseId}`, {
      residentId,
      isOwner
    })
  }
}
