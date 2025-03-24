import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Assert} from '@yunzhi/utils';
import {HouseService} from '../../../../projects/lib/src/service/house.service';
import {House} from '../../../../projects/lib/src/entity/house';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  house: House;

  constructor(private route: ActivatedRoute,
              private houseService: HouseService) {
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
