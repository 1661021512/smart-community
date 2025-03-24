import {Component, OnInit} from '@angular/core';
import {Assert} from '@yunzhi/utils';
import {ResidentService} from '../../../../projects/lib/src/service/resident.service';
import {ActivatedRoute} from '@angular/router';
import {Resident} from '../../../../projects/lib/src/entity/resident';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  private static readonly path = 'resident/view/'
  resident: Resident;

  constructor(private residentService: ResidentService,
              private route: ActivatedRoute) {
  }

  private load(id: number) {
    this.residentService.getById(id)
      .subscribe(value => this.resident = value);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params.id;
      Assert.isInteger(id, ViewComponent.path + ' id must be int');
      this.load(id);
    });
  }

  onResidentIdChange(residentId: number) {
    this.load(residentId);
  }
}
