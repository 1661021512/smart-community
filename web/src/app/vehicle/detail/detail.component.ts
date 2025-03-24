import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {VehicleService} from "../../../../projects/lib/src/service/vehicle.service";
import {Vehicle} from "../../../../projects/lib/src/entity/vehicle";
import {Assert} from "@yunzhi/utils";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private vehicleService: VehicleService) { }

  vehicle: Vehicle;
  showMore = false;


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params.id;
      Assert.isInteger(id, 'id must to int');
      this.vehicleService.getById(id)
        .subscribe((vehicle) => {
          this.validateVehicle(vehicle);
          this.vehicle = vehicle;
        })
    })
    return ;
  }

  OnBack() {
    this.router.navigateByUrl('vehicle').then();
  }

  /**
   * 校验字段是否符合V层表现
   * @param vehicle
   */
  validateVehicle(vehicle: Vehicle): void {
    // 必有条件
    Assert.isNotNullOrUndefined(
      vehicle.owner,
      vehicle.colour,
      vehicle.type,
      vehicle.plateNumber,
      vehicle.brand,
      'vehicle -> detail 未满足table列表的初始化条件'
    )
  }
}
