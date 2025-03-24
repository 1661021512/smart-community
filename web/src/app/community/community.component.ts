import {Component, forwardRef, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {TownSelectComponent} from "../town/town-select/town-select.component";
import {Community} from "../../../projects/lib/src/entity/community";
import {CommunityService} from "../../../projects/lib/src/service/community.service";

/**
 * 社区
 */
@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
})
export class CommunityComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    return;
  }


}
