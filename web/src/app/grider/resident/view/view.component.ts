import { Component, OnInit } from '@angular/core';
import {ResidentService} from '../../../../../projects/lib/src/service/resident.service';
import {ActivatedRoute} from '@angular/router';
import {Assert} from '@yunzhi/utils';
import {Resident} from '../../../../../projects/lib/src/entity/resident';

/**
 * 网格员查看自己管理是的某个居民的信息
 */
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  resident: Resident;

  constructor(private residentService: ResidentService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params.id;
      Assert.isInteger(id, ViewComponent.name + 'id must be int');
      this.residentService.getById(id)
        .subscribe(value => this.resident = value);
    });
  }
}
