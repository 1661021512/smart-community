import {Component, OnInit} from '@angular/core';
import {Assert} from '@yunzhi/utils';
import {ActivatedRoute} from '@angular/router';
import {ResidentService} from '../../../../projects/lib/src/service/resident.service';
import {Resident} from '../../../../projects/lib/src/entity/resident';

/**
 * 编辑居民
 */
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  resident: Resident;

  constructor(private route: ActivatedRoute,
              private residentService: ResidentService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const id = +param.id;
      Assert.isInteger(id, EditComponent.name + 'id must be int');
      this.residentService.getById(id)
        .subscribe(resident => this.resident = resident);
    });
  }

}
