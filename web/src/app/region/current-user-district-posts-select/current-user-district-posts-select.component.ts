import {Component, forwardRef, OnInit} from '@angular/core';
import {DistrictType} from "../../../../projects/lib/src/entity/enum/district-type";
import {WebUserService} from "../../../service/web-user.service";
import {Assert} from "@yunzhi/utils";
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Select2} from "../../share/select2/select2";
import {Duty} from "../../../../projects/lib/src/entity/duty";
import {DutyService} from "../../../../projects/lib/src/service/duty.service";


@Component({
  selector: 'app-current-user-district-posts-select',
  templateUrl: './current-user-district-posts-select.component.html',
  styleUrls: ['./current-user-district-posts-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => CurrentUserDistrictPostsSelectComponent)
    }
  ]
})
export class CurrentUserDistrictPostsSelectComponent implements OnInit, ControlValueAccessor {

  formControl = new FormControl();

  private currentUserRegionType: DistrictType;

  constructor(private userService: WebUserService, private postService:DutyService) {
  }
  /**所有的post*/
  posts = [] as Select2<number, any>[];

  isShowPleaseSelect = true;

  writeValue(obj: DistrictType): void {
    this.formControl.setValue(obj);
  }

  registerOnChange(fn: (data: number) => void): void {
    this.formControl.valueChanges
      .subscribe((data: number) => {
        fn(data);
      });
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
  }
  /**
   * 设置校验岗位
   * @param posts 所有的岗位
   */
  setPosts(posts: Duty[]) {
    posts.forEach(post => {
      Assert.isDefined(post.id, post.name, 'post属性未满足组件条件');
    });
    this.posts = posts.map(post => new Select2<number, any>({
        id: post.id,
        label: post.name,
        option: post.name,
        searchFn: function (searchKey: string) {
          const name = post.name;
          return name.includes(searchKey);
        }
      }
    ));
  }

  ngOnInit(): void {
    this.userService.currentLoginUser$.subscribe(user => {
      Assert.isNotNullOrUndefined(user, 'user格式不正确');
      Assert.isNotNullOrUndefined(user.district, '未传入用户区域或传入的类型不正确');
      Assert.isString(user.district.type, '区域类型并不是string');
      Assert.isNumber(user.district.id, '区域实现ID非法');
      this.currentUserRegionType = user.district.type;
      this.postService.getAllByDistrictType(this.currentUserRegionType)
        .subscribe(posts => {
          this.setPosts(posts);
        })
    })
  }

}
