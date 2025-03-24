import {Component, ElementRef, ViewChild} from '@angular/core';
import {AuthComponent} from '../auth.component';
import {ConfigService} from '../../../service/config.service';

@Component({
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent extends AuthComponent {
  @ViewChild('login')
  loginElementRef: ElementRef;
  @ViewChild('main')
  mainElementRef: ElementRef;

  constructor(configService: ConfigService) {
    super(configService);
  }
}
