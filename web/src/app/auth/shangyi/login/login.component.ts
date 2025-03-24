import {Component} from '@angular/core';
import {LoginComponent as ParentComponent} from '../../base/login/login.component';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../../../projects/lib/src/service/common.service';
import {WebUserService} from '../../../../service/web-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends ParentComponent {

  constructor(builder: FormBuilder,
              activatedRoute: ActivatedRoute,
              router: Router,
              commonService: CommonService,
              userService: WebUserService) {
    super(builder, activatedRoute, router, commonService, userService);
  }
}
