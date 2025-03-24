import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {combineLatest, concat, Observable} from 'rxjs';
import {County} from '../entity/county';
import {User} from '../entity/user';
import {District} from '../entity/district';
import {WebUserService} from '../../../../src/service/web-user.service';
import {Assert} from '@yunzhi/utils';
import {map, shareReplay, tap} from 'rxjs/operators';
import {DistrictType} from '../entity/enum/district-type';
import {CacheNoticeService} from './cache-notice.service';
import {MyFileService} from './my-file.service';
import {GeoJson} from '../entity/geo-json';
import {Attachment} from '../entity/attachment';

/**
 * 系统设置
 */
@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  /**
   * 当前县的缓存
   */
  cache = {
    county$: null as Observable<County>,
  };
  private url = 'district';

  constructor(private httpClient: HttpClient,
              private myFileService: MyFileService,
              private cacheNoticeService: CacheNoticeService,
              private userService: WebUserService) {
    this.userService.setDistrictService(this);

    this.cacheNoticeService.clear$.subscribe(() => {
      this.clearCache();
    });
  }

  /**
   * 获取某个区域下指定regionId记录
   * @param district 上级区域（可能是县、乡镇等）
   * @param districtId 要查找的下级区域ID
   */
  static getByDistrictAndChildId(district: District, districtId: number): District {
    let currentDistrict = null as District;
    let found = false;
    if (district.id === districtId) {
      found = true;
      currentDistrict = district;
    }

    district.children.forEach(child => {
      if (!found) {
        currentDistrict = DistrictService.getByDistrictAndChildId(child, districtId);
        if (currentDistrict !== null) {
          found = true;
        }
      }
    });
    return currentDistrict;
  }

  /**
   * 将树状结构的区域信息转换为包括自己的区域列表
   * @param district 区域
   * @param minRegionType 最小区域类型：仅转换区域类型在该类型之上的区域。比如区域树中有县、乡镇、社区，
   * 如果将此值设置为乡镇，则返回的列表中仅有县及乡镇，没有社区
   * @param connector
   */
  static getChildrenWithItself(district: District, minRegionType: DistrictType, connector = '--'): District[] {
    let districts = [] as District[];
    Assert.isObject(district, this.name + ' district must be object');
    Assert.isDefined(district.id, district.name, this.name + ' district validate error');
    Assert.isString(district.type, this.name + ' district.type must be string');
    districts.push({id: district.id, name: district.name, type: district.type} as District);
    if (district.type !== minRegionType && Array.isArray(district.children) && district.children.length > 0) {
      district.children.forEach(value => {
        // 不改变原来的值，在这复制一样
        const temp = {...value, ...{}};
        temp.name = district.name + connector + temp.name;
        districts = districts.concat(DistrictService.getChildrenWithItself(temp, minRegionType, connector));
      });
    }
    return districts;
  }

  /**
   * 获取区域列表
   * @param county 县
   * @param currentUserRegionId 当前登录用户对应的区域ID
   * @param endType 终止的类型。比如设置为小区的话，则表示最终只显示到小区
   * @param connector 连接符号
   */
  static getDistrictsByCountyAndCurrentUserRegionIdAndConnector(county: County,
                                                                currentUserRegionId: number,
                                                                endType: DistrictType,
                                                                connector = '-') {
    const currentDistrict = this.getByDistrictAndChildId(county, currentUserRegionId);

    if (currentDistrict === null) {
      return [];
    }
    return DistrictService.getChildrenWithItself(currentDistrict, endType, connector);
  }

  /**
   * 获取某个区域上的子区域（不包含孙子区域）
   * @param district 父区域
   * @param id 区域ID
   */
  static getSonsByDistrict(district: District, id: number): District[] | null {
    if (id === district.id) {
      return district.children;
    }

    let result = null as District[];
    district.children.forEach(item => {
      const districts = DistrictService.getSonsByDistrict(item, id);
      if (districts !== null) {
        result = districts;
      }
    });
    return result;
  }

  /**
   * 清除本地及服务器缓存
   * */
  clearCache(): void {
    this.cache = {
      county$: null,
    };
    this.httpClient.get<void>(this.url + '/clearCache').subscribe();
  }

  /**
   * 将区域 ID 转化为具体的县、乡镇、社区
   * @param id 区域 ID
   */
  getById(id: number): Observable<District> {
    return new Observable<District>(subscriber => {
      this.getCounty().subscribe(county => {
        subscriber.next(DistrictService.getByDistrictAndChildId(county, id));
        subscriber.complete();
      });
    });
  }

  /**
   * 获取系统中县的信息(包含子区域信息)
   */
  getCounty(): Observable<County> {
    if (!this.cache.county$) {
      this.cache.county$ = this.httpClient.get<County>(`${this.url}/county`)
        .pipe(map(county => new County(county)), shareReplay(1));
    }

    return this.cache.county$;
  }

  /**
   * 遍历parent直到当前登录用户
   * @param currentUserDistrict 当前登录用户区域
   * @param sonDistrict 子区域
   * @param district 拼接得到的区域字符串 如 ‘社区a-小区b-楼’
   */
  getDistrictByParent(currentUserDistrict: District, sonDistrict: District, district: string): string {
    // 判断是否有parent
    if (sonDistrict.parent.name === undefined) {
      // 没有parent直接返回当前的district
      console.warn('district.parent undefined');
      return district;
    } else {
      // 如果有进一步判断是否遍历到当前登录用户
      if (sonDistrict.parent.type !== currentUserDistrict.type) {
        district = (sonDistrict.parent.name + '-' + district) as string;
        district = this.getDistrictByParent(currentUserDistrict, sonDistrict.parent, district);
      }
    }
    return district;
  }

  /**
   * 获取当前登录用户对应区域以及其子区域的列表
   * @param endType 终止的类型。比如设置为小区的话，则表示最终只显示到小区
   * @param connector 连接符号
   */
  getDistrictsOfCurrentLoginUser(endType: DistrictType, connector = '--'): Observable<District[]> {
    return new Observable<District[]>(subscriber => {
      combineLatest([this.userService.currentLoginUser$, this.getCounty()])
        .subscribe(data => {
          const county = data.pop() as County;
          const user = data.pop() as User;
          if (user) {
            Assert.isDefined(user.district, DistrictService.name + ' user.region must defined');
            Assert.isInteger(user.district.id, DistrictService.name + ' user.region.id must be int');
            const currentUserRegionId = user.district.id;
            subscriber.next(
              DistrictService.getDistrictsByCountyAndCurrentUserRegionIdAndConnector(
                county, currentUserRegionId, endType, connector));
            subscriber.complete();
          }
        });
    });
  }

  getGeoJsonById(districtId: number): Observable<GeoJson> {
    return new Observable<GeoJson>(subscriber => {
      this.getById(districtId).subscribe(district => {
        // 尝试获取子区域的地图，然后接一起。
        this.getSonsById(districtId).subscribe(sons => {
          const result = [] as {district: District, geoJson: Attachment}[];
          if (Array.isArray(sons) && sons.length > 0) {
            sons.forEach(district => {
              if (district.geoJson !== null) {
                result.push({
                  district,
                  geoJson: district.geoJson
                });
              }
            });
          }

          if (result.length === 0) {
            // 子区域的地图合集是空的，就返回自己的地图.
            result.push({district, geoJson: district.geoJson});
          } else if (district.secondaryGeoJson) {
            // 子区域不为空且有辅助地图信息，则添加辅助地图信息
            result.push({district, geoJson: district.secondaryGeoJson});
          }

          this.toGeoJson(result).subscribe(data => {
            subscriber.next(data);
            subscriber.complete();
          }, error => subscriber.error(error), () => subscriber.complete());
        })
      });
    });
  }

  /**
   * 获取子区域
   * @param id 区域ID
   */
  getSonsById(id: number): Observable<District[] | null> {
    return new Observable<District[]>(subscriber => {
      this.getCounty().subscribe(county => {
        subscriber.next(DistrictService.getSonsByDistrict(county, id));
        subscriber.complete();
      }, error => subscriber.error(error), () => subscriber.complete());
    });
  }

  /**
   * 将附件数组转换为geoJson格式
   * @param districtsWithSecondary
   */
  public toGeoJson(districtsWithSecondary: {district: District, geoJson: Attachment}[]): Observable<GeoJson> {
    return new Observable<any>(subscriber => {
      // 定义观察源数组并拼接，进而完成顺序请求、顺序拼接
      const observables = [] as Observable<{district: District, data: GeoJson}>[];
      districtsWithSecondary.forEach(item => {
        Assert.isDefined(item.geoJson, '附件信息未获取到');
        if (item.geoJson) {
          Assert.isDefined(item.geoJson.file, '文件信息未获取到');
          observables.push(this.myFileService.getJson(item.geoJson.file).pipe(map(data => {
            // 将区域以及当前地图是否为 辅助 地图的信息发送给下一订阅者
            return {
              district: item.district,
              data
            }
          })));
        }
      });

      // 定义返回结果
      const result = {
        type: 'FeatureCollection',
        features: []
      };
      concat(...observables).subscribe({
        next: districtAndGeoJson => {
          districtAndGeoJson.data.features.forEach(feature => {
            Assert.isDefined(feature.properties, '区域' + districtAndGeoJson.district.name + '的geoJson文件的属性未空义');
            Assert.isDefined(feature.properties.name, '区域' + districtAndGeoJson.district.name + '的geoJson文件的属性中的name未空义');
            feature.properties.district = districtAndGeoJson.district;
          });
          result.features = result.features.concat(districtAndGeoJson.data.features);
        },
        complete: () => {
          subscriber.next(result);
          subscriber.complete();
        }
      });
    });
  }

  updateGeoMap(id: number, geoMap: Attachment, secondaryMap: Attachment): Observable<District> {
    return this.httpClient.patch<District>(this.url + '/updateGeoMap/' + id, {
      geoJson: geoMap,
      secondaryGeoJson: secondaryMap
    } as District).pipe(tap(() => this.clearCache()));
  }
}
