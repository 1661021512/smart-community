import {Component, OnInit} from '@angular/core';
import {Assert} from '@yunzhi/utils';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  houseId: number;
  residentId: number;
  addOrEdit = 'add' as 'add' | 'edit';

  constructor(private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      Assert.isInteger(+params.houseId, 'house id must be number');
      this.houseId = +params.houseId;
      if (Number.isInteger(+params.residentId)) {
        this.residentId = +params.residentId;
        this.addOrEdit = 'edit';
      }
    });
  }
}
