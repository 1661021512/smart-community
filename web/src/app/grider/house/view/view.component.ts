import {Component, OnInit} from '@angular/core';
import {House} from '../../../../../projects/lib/src/entity/house';
import {ActivatedRoute} from '@angular/router';
import {HouseService} from '../../../../../projects/lib/src/service/house.service';
import {Assert} from '@yunzhi/utils';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
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
