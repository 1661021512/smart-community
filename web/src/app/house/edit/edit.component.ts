import {Component, OnInit} from '@angular/core';
import {Assert} from '@yunzhi/utils';
import {ActivatedRoute} from '@angular/router';
import {HouseService} from '../../../../projects/lib/src/service/house.service';
import {House} from '../../../../projects/lib/src/entity/house';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  house: House;

  constructor(private route: ActivatedRoute,
              private houseService: HouseService,) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params.id;
      Assert.isInteger(id, 'id must to int');
      this.houseService.getById(id)
        .subscribe(house => this.house = house);
    })
  }
}
