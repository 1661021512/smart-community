import {AfterViewInit, Component} from '@angular/core';

/**
 * 一人一档
 */
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements AfterViewInit {

  constructor() {
  }

  /**
   * 子元素按圆型排列
   * https://segmentfault.com/q/1010000012150471
   */
  ngAfterViewInit(): void {
    return;
  }
}
