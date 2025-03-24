import {Component, Input, OnInit} from '@angular/core';
import {CommonService} from '../../../../../projects/lib/src/service/common.service';
import {ActivatedRoute} from '@angular/router';

/**
 * 回退按钮
 */
@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {
  @Input()
  defaultPath = './'

  @Input()
  route = null as ActivatedRoute;
  showButton = false;

  constructor(private commonService: CommonService) {
  }

  onBack() {
    this.commonService.back(this.defaultPath, this.route);
  }

  ngOnInit(): void {
    this.commonService.canBack().subscribe(canBack => {
      this.showButton = canBack;
    })
  }
}
