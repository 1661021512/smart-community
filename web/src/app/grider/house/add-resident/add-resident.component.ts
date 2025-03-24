import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Assert} from '@yunzhi/utils';

@Component({
  selector: 'app-add-resident',
  templateUrl: './add-resident.component.html',
  styleUrls: ['./add-resident.component.scss']
})
export class AddResidentComponent implements OnInit {
  addOrEdit = 'add' as 'add' | 'edit';
  houseId: number;
  residentId: number;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      Assert.isInteger(+params.houseId, '房屋 idmust be number');
      this.houseId = +params.houseId;
      if (Number.isInteger(+params.residentId)) {
        this.residentId = +params.residentId;
        this.addOrEdit = 'edit';
      }
    });
  }
}
