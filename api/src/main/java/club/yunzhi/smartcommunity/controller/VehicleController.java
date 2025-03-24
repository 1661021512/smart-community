package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.*;
import club.yunzhi.smartcommunity.service.VehicleService;
import com.fasterxml.jackson.annotation.JsonView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.*;

/**
 * 车辆
 */
@RestController
@RequestMapping("vehicle")
public class VehicleController {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  private VehicleService vehicleService;

  public VehicleController(VehicleService vehicleService) {
    this.vehicleService = vehicleService;
  }

  @DeleteMapping("{id}")
  public void delete(@PathVariable Long id) {this.vehicleService.delete(id);}

  @GetMapping("page")
  @JsonView(PageJsonView.class)
  public Page<Vehicle> page(
          @RequestParam(required = false) Long villageId,
          @RequestParam(required = false) Long type,
          @RequestParam(required = false, defaultValue = "") String plateNumber,
          @RequestParam(required = false, defaultValue = "") String owner,
          @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC)) Pageable pageable
  ) {
    return this.vehicleService.page(villageId,
            type,
            plateNumber,
            owner,
            pageable);
  }

  @GetMapping("{id}")
  @JsonView(GetByIdJsonView.class)
  public Vehicle getById(@PathVariable Long id) {
    return this.vehicleService.getById(id);
  }

  @PostMapping
  @JsonView(VehicleController.SaveJsonView.class)
  public Vehicle save(@RequestBody Vehicle vehicle) {
    return this.vehicleService.save(vehicle);
  }

  @PutMapping("{id}")
  @JsonView(UpdateJsonView.class)
  public Vehicle update(@PathVariable Long id, @RequestBody Vehicle vehicle) {
    return this.vehicleService.update(id, vehicle);
  }

  public static class GetByIdJsonView implements Vehicle.OwnerJsonView,
          Resident.HouseJsonView,
          House.UnitJsonView,
          Unit.BuildingJsonView,
          Building.VillageJsonView,
          Village.CommunityJsonView,
          User.DistrictJsonView,
          Resident.PhoneJsonView,
          BaseEntity.CreateTimeJsonView,
          Community.TownJsonView,
          Resident.IdNumberJsonView {
  }

  public static class PageJsonView implements Vehicle.OwnerJsonView,
          Resident.HouseJsonView,
          House.UnitJsonView,
          Unit.BuildingJsonView,
          Building.VillageJsonView,
          Village.CommunityJsonView,
          User.DistrictJsonView,
          Resident.PhoneJsonView,
          BaseEntity.CreateTimeJsonView {
  }

  public static class SaveJsonView implements Vehicle.OwnerJsonView {
  }

  public static class UpdateJsonView implements Vehicle.OwnerJsonView {
  }

}
