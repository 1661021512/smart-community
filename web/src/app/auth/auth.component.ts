import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {ConfigService} from '../../service/config.service';

/**
 *  抽像登录组件
 */
@Component({
  template: ''
})
export abstract class AuthComponent implements OnInit, AfterViewInit {
  abstract mainElementRef: ElementRef;
  mainHtmlElement: HTMLElement;
  /** 当前模式 */
  mode = 'login';
  version = '';
  year = new Date().getFullYear();

  protected constructor(private configService: ConfigService) {
  }

  ngAfterViewInit(): void {
    this.mainHtmlElement = this.mainElementRef.nativeElement as HTMLElement;
    this.resetHeight();
    window.onresize = () => {
      this.resetHeight();
    };
  }

  ngOnInit(): void {
    this.version = this.configService.config.version;
  }

  onChangeToLogin(): void {
    this.mode = 'login';
  }

  onChangeToResetPassword(): void {
    this.mode = 'resetPassword';
  }

  onReSetPasswordDone(): void {
    // this.mode = 'login';
  }

  resetHeight() {
    const height = window.innerHeight > 640 ? window.innerHeight : 640;
    this.mainHtmlElement.style.height = height + 'px';
  }

}
