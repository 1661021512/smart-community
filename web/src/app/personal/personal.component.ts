import {Component, OnInit} from '@angular/core';
import {User} from '../../../projects/lib/src/entity/user';
import {WebUserService} from '../../service/web-user.service';
import {Assert} from '@yunzhi/utils';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  user = new User();

  constructor(private userService: WebUserService) {
  }


  ngOnInit(): void {
    this.userService.currentLoginUser$
      .subscribe((data: User) => {
        if (data) {
          this.setUser(data);
        }
      })
  }

  setUser(user: User): void {
    Assert.isNotNullOrUndefined(user.name, 'name must be exist');
    Assert.isNotNullOrUndefined(user.username, 'username must be exit');
    this.user = user;
  }
}
