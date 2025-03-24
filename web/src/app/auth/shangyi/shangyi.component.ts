import {Component, ElementRef, ViewChild} from '@angular/core';
import {AuthComponent} from '../auth.component';
import {ConfigService} from '../../../service/config.service';

@Component({
  templateUrl: './shangyi.component.html',
  styleUrls: ['./shangyi.component.scss']
})
export class ShangyiComponent extends AuthComponent{
  @ViewChild('login')
  loginElementRef: ElementRef;
  @ViewChild('main')
  mainElementRef: ElementRef;

  constructor(configService: ConfigService) {
    super(configService);
  }
}
