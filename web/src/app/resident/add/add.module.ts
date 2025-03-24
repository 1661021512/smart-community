import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddComponent} from './add.component';
import {ResidentAddModule} from '../resident-add/resident-add.module';
import {AddRoutingModule} from './add-routing.module';

/**
 * 新增(或编辑某个住房中的)居民
 * <p>
 *   系统做了一些感觉不太合适的优化
 *   比如当前的功能只所以集成了编辑，是因为：
 *   用户查看某个房子的居民时，如果点了编辑按钮
 *   我们可以同步让其实现直接在当前界面向当前房子中添加新居民
 *   该功能的实现是比较费时的，但功能的出彩性并不强。
 *   总之：这是一个追求技术突破的不合理的，没有性价比的功能。
 *   我们大可以把在该功能上花的时间放到其它的优化上。
 *   以后应该避免
 */
@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    ResidentAddModule,
    AddRoutingModule
  ],
  exports: [
    AddComponent
  ]
})
export class AddModule {
}
