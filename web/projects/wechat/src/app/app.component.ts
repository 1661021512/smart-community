import {Component, Inject, OnInit, Optional} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';
import {WechatUserService} from './service/wechat-user.service';
import {Observable, of} from 'rxjs';
import {Assert} from '@yunzhi/utils';
import {CommonService} from './service/common.service';
import {environment} from '../environments/environment';
import {LoadingInterceptor, HttpErrorInterceptor} from '@yunzhi/ng-common';
import {HTTP_INTERCEPTORS, HttpInterceptor} from '@angular/common/http';
import {AuthUserService} from '../../../lib/src/service/auth-user.service';
import {WechatUser} from '../../../lib/src/entity/wechat-user';
import {User} from '../../../lib/src/entity/user';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'wechat-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  init = false;
  loading = 0;
  showBack = false;
  title = '智慧社区';

  private loadingComponent: HTMLIonLoadingElement;
  private loadingInterceptor: LoadingInterceptor;
  private httpErrorInterceptor: HttpErrorInterceptor;

  constructor(@Optional() @Inject(HTTP_INTERCEPTORS) interceptors: HttpInterceptor[],
              private commonService: CommonService,
              private authUserService: AuthUserService,
              private wechatService: WechatUserService,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private router: Router,
              private route: ActivatedRoute) {
    if (interceptors) {
      interceptors.forEach(interceptor => {
        if (interceptor instanceof LoadingInterceptor) {
          this.loadingInterceptor = interceptor as LoadingInterceptor;
        }
        if (interceptor instanceof HttpErrorInterceptor) {
          this.httpErrorInterceptor = interceptor;
        }
      });
    }
  }

  ngOnInit(): void {
    this.initApp();
    this.checkEnvironment()
      .subscribe(result => {
        if (!result) {
          this.commonService.error(() => {
          }, '当前应用仅支持在微信小程序中运行');
        } else {
          this.initComponent();
          this.checkAuth();
        }
      });
  }

  initApp() {
    if (this.httpErrorInterceptor) {
      this.httpErrorInterceptor.error = (url: string, message: string) => {
        this.alertController.create({
          header: '发生错误!',
          message: url + ': ' + message,
          buttons: [{
            text: '关闭'
          }]
        }).then(result => result.present());
      }
      this.httpErrorInterceptor.goToLoginPath = () => {
        this.wechatService.goToWechatMiniProgramEnvironmentAuthPage();
      };
    }

    Assert.showError = message => {
      this.alertController.create({
        header: '出错啦',
        message: '错误信息：' + message + '。请联系我们(13920618851微信同号)',
        buttons: [{
          text: '关闭'
        }]
      }).then(result => result.present());
    };

    this.commonService.canBack()
      .subscribe(canBack => this.showBack = canBack);
  }

  checkEnvironment(): Observable<boolean> {
    if (!environment.production) {
      return of(true);
    }
    return this.wechatService.checkIsWechatMiniProgramEnvironment();
  }

  initComponent(): void {
    this.loadingController.create({
      message: '加载中...'
    }).then(loadingComponent => {
      this.loadingComponent = loadingComponent;
      if (this.loadingInterceptor) {
        this.loadingInterceptor.showLoading = () => {
          this.loadingComponent.present().then();
        }
        this.loadingInterceptor.hideLoading = () => {
          this.loadingComponent.dismiss().then();
        }
      } else {
        console.warn('未获取到loading拦截器');
      }
    });
  }

  checkAuth(): void {
    // 500ms延迟来等待Angular初始化完毕，否则在snapshot在接收到空的路由参数
    of(null).pipe(delay(500)).subscribe(() => {
      const params = this.route.snapshot.queryParams;
      const token = params['x-auth-token'];
      let observable: Observable<WechatUser | User>;
      if (token) {
        observable = this.authUserService.loginByToken(token);
      } else if (!this.init) {
        observable = this.authUserService.login();
      }
      observable.subscribe({
        next: () => {
          this.init = true;
        },
        error: () => {
          this.wechatService.goToWechatMiniProgramEnvironmentAuthPage();
        }
      });
    });
  }
}
