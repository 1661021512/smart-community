import {HttpClient} from './http-client';
import {Observable, Operators, ReplaySubject} from 'wx-rxjs';
import {WechatUser} from '../model/wechat-user';

export class UserService {
    private state = {
        xAuthToken: undefined as string
    }
    private url = '/wechatUser';
    registeredSubject = new ReplaySubject<boolean>(1);
    registered$ = this.registeredSubject.asObservable();

    get xAuthToken(): string {
        return this.state.xAuthToken;
    }

    constructor(private httpClient: HttpClient) {
    }

    login() {
        wx.showLoading({
            title: '自动登录中',
        });
        wx.login({
            success: res => {
                console.log(res);
                const url = `${this.url}/login`;
                this.httpClient.get<WechatUser>(url, {
                    headers: {
                        'wechat-code': res.code
                    }, observe: 'response'
                })
                  .pipe(Operators.map(response => {
                      response.data = new WechatUser(response.data);
                      return response;
                  }))
                  .subscribe({
                        next: response => {
                            if (response.statusCode !== 200 && response.statusCode !== 401) {
                                this.httpClient.showError(url, 'GET', response.statusCode);
                                return;
                            }
                            this.state.xAuthToken = response.header['x-auth-token'] as string;
                            console.log('获取到的xAuthToken为' + this.state.xAuthToken);
                            const user = response.data;
                            if (user.registered) {
                                console.log('注册用户');
                                this.registeredSubject.next(true);
                            } else {
                                console.log('非注册用户');
                                this.registeredSubject.next(false);
                            }
                        },
                        error: () => this.registeredSubject.next(false),
                        complete: () => {
                            wx.hideLoading();
                            return;
                        }
                    }
                  );
            },
            error: () => {
                console.log('login false');
            }
        })
    }

    /**
     * 用户注册
     * @param encryptedData 微信提供的加密后的手机号数据
     * @param iv 加密算法的初始向量
     */
    register(encryptedData: string, iv: string
    ): Observable<boolean> {
        return this.httpClient.post<boolean>(this.url + '/register',
          {encryptedData, iv});
    }
}
