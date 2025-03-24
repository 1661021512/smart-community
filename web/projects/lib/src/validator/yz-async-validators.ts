import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {WebUserService} from '../../../../src/service/web-user.service';
import {TownService} from '../service/town.service';
import {VillageService} from '../service/village.service';
import {CommunityService} from '../service/community.service';
import {GriderService} from 'projects/lib/src/service/grider.service';
import {VehicleBrandService} from "../service/vehicle-brand.service";

/**
 * 异步验证器.
 */
@Injectable({
  providedIn: 'root'
})
export class YzAsyncValidators {

  constructor(private httpClient: HttpClient,
              private userService: WebUserService,
              private griderService: GriderService,
              private townService: TownService,
              private villageService: VillageService,
              private communityService: CommunityService,
              private vehicleBrandService: VehicleBrandService) {
  }

  /**
   * 验证方法，社区名称
   */
  communityNameNotExist(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (control.value === '') {
        return of(null);
      }
      return this.communityService.existByName(control.value).pipe(map(exists => exists ? {communityNameExist: true} : null));
    };
  };

  /**
   * 验证方法，查询手机号所对应的网格员是否存在
   */
  griderNotExist(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      //控制表单输入的username，用来验证是否已经注册网格员
      if (control.value === '') {
        return of(null);
      }
      return this.griderService.existByUsername(control.value).pipe(map(exists => exists ? {griderExist: true} : null));
    };
  };

  /**
   * 验证方法，乡镇名称
   */
  townNameNotExist(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (control.value === '') {
        return of(null);
      }
      return this.townService.existByName(control.value).pipe(map(exists => exists ? {townNameExist: true} : null));
    };
  };

  /**
   * 验证方法，手机号
   */
  usernameNotExist(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {  //控制表单输入的username，用来验证是否已经存在
      if (control.value === '') {
        return of(null);
      }
      return this.userService.existByUsername(control.value).pipe(map(exists => exists ? {usernameExist: true} : null));
    };
  };

  /**
   * 验证方法，小区名称
   */
  villageNameNotExist(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (control.value === '') {
        return of(null);
      }
      return this.villageService.existByName(control.value).pipe(map(exists => exists ? {villageNameExist: true} : null));
    };
  };

}
