import {Injectable} from '@angular/core';
import {Observable, of, BehaviorSubject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../../projects/lib/src/entity/user';
import {catchError, map, tap} from 'rxjs/operators';
import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn} from '@angular/forms';
import {UserStatus} from '../../projects/lib/src/entity/enum/user-status';
import {Assert, isNotNullOrUndefined, Random} from '@yunzhi/utils';
import {HttpSuccessResponse, Page} from '@yunzhi/ng-common';
import {Role} from '../../projects/lib/src/entity/role';
import {UserModel} from '../../projects/lib/src/modal/user-model';
import {DistrictService} from '../../projects/lib/src/service/district.service';
import {CacheNoticeService} from '../../projects/lib/src/service/cache-notice.service';
import {ROLE_TYPE, RoleType} from '../../projects/lib/src/entity/enum/role-type';

@Injectable({
  providedIn: 'root'
})
export class WebUserService {
  public static VERIFICATION_CODE = 'verificationCode';
  eUser = {
    newEmail: null as unknown as string,
    oldEmail: null as unknown as string
  };
  protected baseUrl = 'webUser';
  /**
   * buffer 设置为 1
   * 只保留最新的登录用户
   */
  protected currentLoginUserSubject = new BehaviorSubject<User | null | undefined>(undefined);
  currentLoginUser$ = this.currentLoginUserSubject.asObservable();

  /**
   * 登录成功后触发的回调函数
   */
  private loginTriggerCallbacks = new Array<() => void>();
  private districtService: DistrictService;

  constructor(protected httpClient: HttpClient,
              protected cacheNoticeService: CacheNoticeService) {
  }

  /**
   * 用户绑定
   * @param bUser 用户
   */
  bind(bUser: {name: string, username: string, num: string, verificationCode: string}): Observable<User> {
    Assert.isString(bUser.name, bUser.username, bUser.num, bUser.verificationCode, '姓名，用户名，学号/工号等必须设置');
    return this.httpClient.post<User>(this.baseUrl + '/userBinding', bUser);
  }

  /**
   * 校验密码是否正确
   * @param oldPassword 密码
   */
  public checkPasswordIsRight(oldPassword: string): Observable<boolean> {
    // 由于后台接收时接收两个参数， 而且不能为null，newPassword未使用到，传入随机值
    // 如果传入user， user的password会被自动加密， 密码必然错误
    const vUser = {password: oldPassword, newPassword: Random.nextString('', 6)};
    return this.httpClient.post<boolean>(this.baseUrl + '/checkPasswordIsRight', vUser);
  }

  /**
   * 校验新密码与校验密码是否相同
   * @param control 表单
   */
  public confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get('newPassword')?.value;
    const confirmNewPassword = control.get('confirmNewPassword')?.value;

    // 判断确认密码与新密码是否相同
    if (newPassword && confirmNewPassword) {
      return newPassword !== confirmNewPassword ? {confirmPasswordError: true} : null;
    }
    return null;
  };

  /**
   * 删除
   */
  public delete(userId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.baseUrl}/${userId.toString()}`);
  }

  /**
   * 校验输入的手机号码是否已经存在
   */
  public existByUsername(username: string): Observable<boolean> { //订阅
    const params = new HttpParams().append('username', username);
    return this.httpClient.get<boolean>(this.baseUrl + '/existByUsername', {params});
  }

  /**
   * 冻结用户
   * @param userId 用户id
   */
  public frozen(userId: number): Observable<{status: UserStatus}> {
    return this.httpClient.patch<{status: UserStatus}>(`${this.baseUrl}/frozen/${userId.toString()}`, {});
  }

  /**
   * 通过Id获取用户
   */
  public getById(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${userId.toString()}`);
  }

  /**
   * 根据username 获得用户姓名和Id
   */
  public getByUsername(username: string): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl + '/getByUsername/' + username);
  }
  
  /**
   * 获取当前登录用户
   */
  public getCurrentUser(): User | null {
    return this.currentLoginUserSubject.value;
  }

  /**
   * 根据username获取角色.
   * @param username 用户名
   */
  getRolesByUsername(username: string): Observable<Array<number>> {
    const params = new HttpParams().append('username', username);
    return this.httpClient.get<Array<number>>(this.baseUrl + '/getRolesByUsername', {params});
  }

  getUserModelByUser(user: User): Observable<UserModel> {
    Assert.isDefined(this.districtService, self + ' please set regionService first be class setRegionService function');
    if (!user) {
      return of(new UserModel());
    }

    Assert.isDefined(user.district, self.name + ' user.region must be defined');
    Assert.isInteger(user.district.id, self.name + ' user.region.id must be defined');
    return new Observable<UserModel>(subscriber => {
      this.districtService.getById(user.district.id)
        .subscribe(district => {
          subscriber.next(new UserModel({district, user}));
          subscriber.complete();
        })
    });
  }

  /**
   * 请求当前登录用户
   */
  initCurrentLoginUser(callback?: () => void): Observable<User> {
    // 由于在构造函数中使用了本函数, 不加setTimeout在其他地方注入时可能会造成undefined的问题
    // 为什么httpClient请求不以异步进行 需要setTimeout还没研究明白
    return new Observable<User>(subscriber => {
      this.httpClient.get<User>(`${this.baseUrl}/currentLoginUser`)
        .subscribe((user: User) => {
            this.triggerLoginCallbacks();
            this.setCurrentLoginUser(user);
            subscriber.next(user);
          }, error => {
            if (callback) {
              callback();
            }
            subscriber.error(error);
          },
          () => {
            if (callback) {
              callback();
            }
            subscriber.complete();
          });
    });
  }

  /**
   * 判断新邮箱是否已存在于数据表中
   */
  public isEmailExist(param: {email: string}): Observable<boolean> {
    const httpParams = new HttpParams()
      .append('email', param.email ? param.email : '');
    return this.httpClient.get<boolean>(`${this.baseUrl}/isEmailExist`, {params: httpParams});
  }

  /**
   * 是否需要输入验证码.
   * @param username 用户名
   */
  public isRequireValidationCode(username: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/isRequireValidationCode/${username}`);
  }

  login(user: {username: string, password: string, verificationCode: string}): Observable<User> {
    // 新建Headers，并添加认证信息
    let headers = new HttpHeaders();
    // 添加 content-type
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded')
      .append(WebUserService.VERIFICATION_CODE, user.verificationCode);
    // 添加认证信息
    headers = headers.append('Authorization',
      'Basic ' + btoa(user.username + ':' + encodeURIComponent(user.password)));

    // 发起get请求并返回
    return this.httpClient.get<User>(`${this.baseUrl}/login`, {headers})
      .pipe(tap(data => this.setCurrentLoginUser(data)));
  }

  logout(): Observable<void> {
    return this.httpClient.get<void>(`${this.baseUrl}/logout`).pipe(tap(() => {
      this.currentLoginUserSubject.next(null);
      this.cacheNoticeService.clear();
    }));
  }

  /**
   * 验证新邮箱是否被占用
   */
  public newEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      if (control.value === '') {
        return of(null);
      }
      return this.isEmailExist({email: control.value})
        .pipe(map(result => result ? {exist: true} : null),
          catchError(() => of(null)));
    };
  }

  /**
   * 验证原密码是否正确
   */
  public oldPasswordValidator(): AsyncValidatorFn {
    return (ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.checkPasswordIsRight(ctrl.value)
        .pipe(map((isRight: boolean) => (isRight ? null : {passwordError: true})),
          catchError(async () => null));
    };
  }

  /**
   * 分页方法
   * @param page 第几页
   * @param size 每页条数
   * @param param 查询参数
   */
  public page(page: number, size: number, param: {username?: string, name?: string, districtName?: string}): Observable<Page<User>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('username', isNotNullOrUndefined(param.username) ? param.username.toString() : '')
      .append('name', isNotNullOrUndefined(param.name) ? param.name : '')
      .append('district', isNotNullOrUndefined(param.districtName) ? param.districtName : '');
    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 User 对象。
    return this.httpClient.get<Page<User>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<User>(data).toObject(o => new User(o))));
  }

  /**
   * 重置密码
   * @param id 用户id
   */
  public resetPassword(id: number): Observable<string> {
    Assert.isNotNullOrUndefined(id, 'id未传入');
    const url = `${this.baseUrl}/resetPassword/${id}`;
    return this.httpClient.patch<string>(url, {});
  }

  /**
   * 较验验证码是否正确
   */
  resetPasswordByUsernameAndCode(params: {username: string, verificationCode: string}): Observable<String> {
    return this.httpClient.patch<String>(this.baseUrl + '/resetPasswordByUsernameAndCode', params);
  }

  /**
   * 用户新增
   */
  public save(user: User): Observable<User> {
    // 向后台请求,并通过管道返回User对象
    return this.httpClient.post<User>(`${this.baseUrl}`, user)
      .pipe(map(data => new User(data)));
  }

  /**
   * 发送登录验证码
   * @param username 手机号
   * @author panjie
   */
  public sendVerificationCode(username: string): Observable<HttpSuccessResponse> {
    Assert.isString(username, '用户名类型为段为字符串');

    const params = new HttpParams()
      .append('username', username)
    return this.httpClient
      .get<HttpSuccessResponse>(`${this.baseUrl}/sendVerificationCode`, {params});
  }

  /**
   * 设置当前登录用户
   * @param user 登录用户
   */
  setCurrentLoginUser(user: User | undefined | null): void {
    if (user !== this.currentLoginUserSubject.value) {
      this.currentLoginUserSubject.next(user);
    }

    if (!user) {
      this.cacheNoticeService.clear();
    }
  }

  /**
   * 设置区域服务
   * @param service 区域服务
   */
  setDistrictService(service: DistrictService): void {
    this.districtService = service;
  }

  setPassword(password: string): Observable<void> {
    return this.httpClient.patch<void>(this.baseUrl + '/setPassword', {password});
  }

  /**
   * 调用登录成功后的回调函数
   */
  public triggerLoginCallbacks(): void {
    this.loginTriggerCallbacks.forEach(callback => {
      if (callback) {
        callback();
      }
    });
  }

  /**
   * 解冻用户
   * @param userId 用户id
   */
  unfrozen(userId: number): Observable<{status: UserStatus}> {
    return this.httpClient.patch<{status: UserStatus}>(`${this.baseUrl}/unfrozen/${userId}`, {});
  }

  /**
   * 更新
   */
  public update(userId: number, user: {name: string, username: string, roles: Role[], district: {id: number}}): Observable<User> {
    Assert.isNumber(userId, 'userId must be number');
    Assert.isNotNullOrUndefined(user, user.name, user.username,
      'some properties must be passed');

    return this.httpClient.put<User>(`${this.baseUrl}/${userId.toString()}`, user);
  }

  /**
   * 登录用户修改密码
   * @param newPassword 新密码
   * @param oldPassword 旧密码
   */
  public updatePassword(newPassword: string, oldPassword: string): Observable<void> {
    const vUser = {password: oldPassword, newPassword: encodeURIComponent(newPassword)};
    return this.httpClient.put<void>(this.baseUrl + '/updatePassword', vUser);
  }

  /**
   * 校验手机号是否存在
   * 当user存在时说明是修改，改为本身的手机号时不报错
   * @param user 修改的用户
   */
  public usernameExistValidator(user: User): AsyncValidatorFn {
    return (ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      if (user && ctrl.value === user.username) {
        return of(null);
      }

      return this.existByUsername(ctrl.value)
        .pipe(map((usernameExist: boolean) => (usernameExist ? {usernameExistError: true} : null)),
          catchError(async () => null));
    };
  }
}
