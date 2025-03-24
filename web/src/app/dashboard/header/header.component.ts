import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  state = {
    title: environment.title
  }

  @Input()
  set title(title: string) {
    this.state.title = title;
  }

  constructor() {
  }
}
