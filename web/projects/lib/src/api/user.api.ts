import {HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {ApiInjector, MockApiInterface, RequestOptions} from '@yunzhi/ng-mock-api';
import {Observable} from 'rxjs';
import {User} from '../entity/user';
import {ROLE_TYPE} from '../entity/enum/role-type';
import {Role} from '../entity/role';
import {USER_STATUS} from '../entity/enum/user-status';
import {Assert, randomNumber, randomString} from '@yunzhi/utils';
import {Page} from '@yunzhi/ng-common';
import {District} from '../entity/district';

export class UserApi implements MockApiInterface {
  public static districts = [
    {id: 1, type: 'county', name: randomString('县', 4)},
    {id: 2, type: 'town', name: randomString('镇', 4), parent: {id: 1, type: 'county', name: randomString('县', 4)}},
    {
      id: 3,
      type: 'community',
      name: randomString('社区', 4),
      parent: {
        id: 2,
        type: 'town',
        name: randomString('镇', 4),
        parent: {id: 1, type: 'county', name: randomString('县', 4)}
      }
    },
    {
      id: 4, type: 'village', name: randomString('小区', 4), parent: {
        id: 3, type: 'community', name: randomString('社区', 4), parent: {
          id: 2, type: 'town', name: randomString('镇', 4),
          parent: {id: 1, type: 'county', name: randomString('县', 4)}
        }
      }
    }] as District[];
  public static currentLoginUser = {
    name: randomString('name'),
    username: randomString('username'),
    roles: [
      {
        id: 0,
        weight: 0,
        name: '管理员',
        value: ROLE_TYPE.admin.value
      },
      {
        id: 1,
        weight: 1,
        name: '用户',
        value: ROLE_TYPE.user.value
      },
      {
        id: 2,
        weight: 2,
        name: '党建成员',
        value: ROLE_TYPE.party.value
      },
      {
        id: 3,
        weight: 3,
        name: '网格员',
        value: ROLE_TYPE.grider.value
      }, {
        id: 4,
        weight: 4,
        name: '志愿者',
        value: ROLE_TYPE.volunteer.value
      }, {
        id: 5,
        weight: 5,
        name: '社区工作人员',
        value: ROLE_TYPE.communityWorker.value
      }],
    district: UserApi.districts[randomNumber(4)] as District
  } as User;
  protected baseUrl = 'webUser';
  private sessionKey = 'currentLoginUser';

  /**
   * 获取当前登录用户
   */
  getCurrentLoginUser(): User {
    return UserApi.currentLoginUser;
  }

  getInjectors(): ApiInjector[] {
    return [
      // 登录
      {
        url: this.baseUrl + '/login',
        method: 'GET',
        result: (urlMatches: any, options: {headers: HttpHeaders;}) => {
          const auth = options.headers.get('Authorization');
          if (auth === null) {
            const xAuthToken = options.headers.get('x-auth-token');
            if (xAuthToken === null) {
              return new Observable<HttpErrorResponse>(subscriber => {
                subscriber.error(new HttpErrorResponse({status: 401}));
                subscriber.complete();
              });
            } else {
              return {};
            }
          } else {

            const auths = atob(auth!.substr(6)).split(':');
            const username = auths[0];
            const password = auths[1];

            if (password === 'yunzhi') {
              let user: User;
              user = new User({
                id: randomNumber(),
                username
              });
              user.roles = [new Role({value: ROLE_TYPE.user.value})];

              if (username === '13900000000') {
                user.roles = [
                  new Role({value: ROLE_TYPE.grider.value}),
                  new Role({value: ROLE_TYPE.admin.value})
                ];
              }

              if (username === '13911111111') {
                user.roles = [
                  new Role({value: ROLE_TYPE.party.value}),
                  new Role({value: ROLE_TYPE.admin.value})];
              }

              if (username === '13922222222') {
                user.roles = [new Role({value: ROLE_TYPE.admin.value})];
              }
              // 设置user基本信息
              user.name = randomString('姓名');
              this.setCurrentLoginUser(user);
              return user;
            } else {
              return new Observable<HttpErrorResponse>(subscriber => {
                subscriber.error(new HttpErrorResponse({status: 401}));
                subscriber.complete();
              });
            }
          }
        }
      },
      //根据id获取用户
      {
        url: this.baseUrl + '/(\\d+)',
        description: 'getById',
        result: (urlMatches: any) => {
          const id = +urlMatches[1];
          Assert.isTrue(Number.isInteger(id), 'id must be number');
          return {
            id,
            name: randomString('姓名'),
            username: '13333333333',
            roles: [{id: randomNumber(4)}, {id: randomNumber(4)}] as Role[],
            district: {
              id: randomNumber(4) + 1
            }
          } as User;
        }
      },
      {
        method: 'POST',
        description: 'save: 新增用户',
        url: this.baseUrl,
        result: (urlMatches: any, options: {body: User;}) => {
          let body = {} as User;

          if (options) {
            body = options.body;
          }

          // 断言传入的数据不为空
          Assert.isString(body.name, 'name must be set');
          Assert.isString(body.username, 'username must be set');
          Assert.isArray(body.roles, 'roles must be array');
          Assert.isDefined(body.district, 'region must be defined');
          Assert.isInteger(body.district.id, self.name + ' region.id must be int');

          // 构造返回数据
          return {
            id: randomNumber(),
            name: body.name,
            username: body.username,
            roles: body.roles,
            district: body.district
          } as User;
        }
      },
      // 删除用户
      {
        method: 'DELETE',
        url: `${this.baseUrl}/(\\d+)`
      },
      // 获取当前登录用户
      {
        method: 'GET',
        url: this.baseUrl + '/currentLoginUser',
        result: () => {
          return this.getCurrentLoginUser();
        }
      },
      // 注销
      {
        method: 'GET',
        url: `${this.baseUrl}/logout`,
        result: () => {
          if (this.getCurrentLoginUser() !== null) {
            this.clearCurrentLoginUser();
            return null;
          } else {
            return new Observable<HttpErrorResponse>(subscriber => {
              subscriber.next(new HttpErrorResponse({status: 401}));
              subscriber.complete();
            });
          }
        }
      },
      // 检验密码是否正确
      {
        method: 'POST',
        url: this.baseUrl + '/checkPasswordIsRight',
        result: (urlMatches: (string)[], options: {body: {password: string, newPassword: string};}) => {
          let body = {} as {password: string, newPassword: string};

          if (options) {
            body = options.body;
          }
          Assert.isString(body.password, 'password must be set');
          return 'yunzhi' === body.password;
        }
      },
      // 修改密码
      {
        method: 'PUT',
        url: this.baseUrl + '/updatePassword',
        result: (urlMatches: (string)[], options: {body: {password: string, newPassword: string};}) => {
          const body = options.body;

          Assert.isString(body.password, 'password must be set');
          Assert.isString(body.newPassword, 'newPassword must be set');
        }
      },
      // 重置密码
      {
        method: 'PATCH',
        url: `${this.baseUrl}/resetPassword/(\\d+)`,
        description: '重置密码',
        result: (urlMatches: (string)[],
                 options: {params: HttpParams}) => {
          const body = options.params;
          console.log(body);
          // Assert.isString(body.get('phone'), 'username must be set');
          // Assert.isString(body.get('sverificationCode'), 'verificationCode must be set');
          return randomString();
        }
      },
      // 冻结用户
      {
        url: `${this.baseUrl}/frozen/(\\d+)`,
        method: 'PATCH',
        result: {status: USER_STATUS.frozen.value},
      },
      // 解冻用户
      {
        url: `${this.baseUrl}/unfrozen/(\\d+)`,
        method: 'PATCH',
        result: {status: USER_STATUS.normal.value},
      },
      // 根据username获取用户角色
      {
        url: this.baseUrl + '/getRolesByUsername',
        method: 'GET',
        result: (urlMatches: (string)[], options: {params: HttpParams}) => {

          const username = options.params.get('username');
          Assert.isString(username, 'username must be set');
          const roles = new Array<Role>();
          if (username === '13900000000' || username === '13911111111') {
            roles.push({value: randomNumber() % 2 ? ROLE_TYPE.party.value : ROLE_TYPE.grider.value} as Role);
            roles.push({value: ROLE_TYPE.admin.value} as Role);
            return roles;
          }
          roles.push({value: ROLE_TYPE.user.value} as Role);
          return roles;
        }
      },
      // 绑定用户
      {
        url: this.baseUrl + '/userBinding',
        method: 'POST',
        result: (urlMatches: (string)[],
                 options: {body: {user: {name: string, username: string, num: string, verificationCode: string}};}) => {
          const body = options.body;
          Assert.isString(body.user.name, 'name must be set');
          Assert.isString(body.user.username, 'username must be set');
          Assert.isString(body.user.num, 'num must be set');
          Assert.isString(body.user.verificationCode, 'verificationCode must be set');

          return {
            password: randomString(),
          } as User;
        }
      },
      // 发送验证码
      {
        url: this.baseUrl + '/sendVerificationCode',
        method: 'GET',
        result: (urlMatches: (string)[], options: {params: HttpParams}) => {
          const params = options.params;
          Assert.isString(params.get('username'), 'username must be set');
          const username = params.get('username');
          if (username === '13900000000') {
            return new HttpErrorResponse({error: {message: '手机号已注册'}});
          }

          if (username === '13911111111') {
            return new HttpErrorResponse({error: {message: '系统内未找到该手机号'}});
          }
          return null;
        }
      },
      // 设置密码
      {
        url: this.baseUrl + '/setPassword',
        method: 'PATCH',
        result: (urlMatches: (string)[], options: {body: {password: string};}) => {
          let body = options.body;

          if (options) {
            body = options.body;
          }
          Assert.isString(body.password, 'password must be set');
        }
      },
      //分页
      {
        url: this.baseUrl + '/page',
        method: 'GET',
        result: (urlMatches: (string)[], options: {params: HttpParams;}) => {
          const params = options.params as HttpParams;
          console.log('接受的参数为：', params);
          const page = +params.get('page');
          const size = +params.get('size');
          // 参数校验
          Assert.isNotNullOrUndefined(page, size, 'page,size为必选');
          Assert.isDefined(params.get('name'), self.name + ' 选填参数未添加全');
          Assert.isDefined(params.get('username'), self.name + ' 选填参数未添加全');

          const beginId = page * size;
          const users = new Array<User>();
          for (let i = 0; i < +size; i++) {
            users.push({
              id: beginId + i + 1,
              name: randomString('名字'),
              username: randomString('电话'),
              district: {
                id: randomNumber(),
                name: randomString('所属区域'),
                type: 'town'
              } as District,
              status: randomNumber(2)
            } as User);
          }

          // 遍历users给其中的roles对象赋值
          users.forEach(user => {
            const roles = new Array<Role>();
            for (let i = 0; i < 2; i++) {
              roles.push(new Role(
                {
                  id: randomNumber(4),
                  name: randomString('角色')
                }));
            }
            user.roles = roles;
          });
          return {
            content: users, number: page, size, totalElements: 40 + randomNumber()
          } as Page<User>;
        }
      },
      {
        method: 'PUT',
        description: 'update',
        url: `${this.baseUrl}/(\\d+)`,
        result: (urlMatches: (string)[], option: {body: User}) => {
          const id = +urlMatches[1];
          Assert.isNumber(id, 'id must be integer');
          const user = option.body as User;
          Assert.isDefined(user.name, user.username, user.roles, user.district, self.name + ' user checked fail');
          Assert.isArray(user.roles, 'user roles must be array');
          Assert.isInteger(user.district.id, 'user region id must be int');

          user.id = id;
          return user;
        }
      },
      {
        url: this.baseUrl + '/existByUsername',
        description: '判断手机号是否已经存在',
        result: (urlMatches: any, options: RequestOptions): boolean => {
          const params = options.params as HttpParams;
          if (!params.has('username')) {
            throw new Error('未接收到查询参数username');
          }
          const username = params.get('username') as string;
          return username === '13900000000';
        }
      }, {
        method: 'GET',
        url: this.baseUrl + '/getByUsername',
        description: '判断手机号是否已经存在',
        result: () => {
          return {
            id: randomNumber(),
            name: randomString('用户名')
          } as User;
        }
      }
    ];
  }

  /**
   * 清除当前登录用户
   */
  private clearCurrentLoginUser(): void {
    localStorage.removeItem(this.sessionKey);
  }

  /**
   * 设置当前登录用户
   * @param user 用户
   */
  private setCurrentLoginUser(user: User): void {
    localStorage.setItem(this.sessionKey, JSON.stringify(user));
  }
}
