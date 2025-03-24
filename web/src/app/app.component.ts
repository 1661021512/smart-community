import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {WebUserService} from '../service/web-user.service';
import {Router} from '@angular/router';
import {User} from '../../projects/lib/src/entity/user';
import {LoadingInterceptor} from '../interceptor/loading.interceptor';
import {randomNumber} from '@yunzhi/utils';
import {NgxSpinnerService} from 'ngx-spinner';
import {delay} from 'rxjs/operators';
import {of, Subscription} from 'rxjs';
import {ConfigService} from '../service/config.service';
import {AuthUserService} from '../../projects/lib/src/service/auth-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  /**是否初始化完毕*/
  init = false;
  loading = 0;
  spinnerType: string;
  spinnerTypes = ['ball-fussion', 'ball-clip-rotate-multiple',
    'ball-spin-clockwise', 'cog', 'square-jelly-box', 'timer'];
  title = environment.title;
  user = undefined as User;
  private showLoadingSubscription = null as Subscription;
  private showLoading = false;

  constructor(
    private authUserService: AuthUserService,
    private userService: WebUserService,
    private spinner: NgxSpinnerService,
    private configService: ConfigService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.configService.checkVersion();
    this.userService.initCurrentLoginUser().subscribe(user => this.user = user, () => {
      if (!this.router.url.startsWith('/login')) {
        this.router.navigateByUrl('/login').then(() => this.init = true);
      } else {
        this.init = true;
      }
    }, () => {
      this.init = true;
    });
    this.generateSpinnerType();
    LoadingInterceptor.loading$.subscribe(loading => {
      this.setLoading(loading);
    });
  }

  setLoading(loading: boolean): void {
    if (loading) {
      this.loading++;
    } else if (this.loading > 0) {
      this.loading--;
    }

    if (this.loading === 1 && loading) {
      this.showLoadingSubscription = of({}).pipe(delay(500)).subscribe(
        () => {
          this.showLoading = true;
          this.spinner.show().then();
          this.showLoadingSubscription = null;
        });
    } else if (this.loading === 0) {
      if (this.showLoadingSubscription) {
        this.showLoadingSubscription.unsubscribe();
        this.showLoadingSubscription = null;
      } else {
        this.showLoading = false;
        this.spinner.hide().then();
      }
    }
  }

  generateSpinnerType() {
    this.spinnerType = this.spinnerTypes[randomNumber() % this.spinnerTypes.length];
    console.log(this.spinnerType);
  }
}
