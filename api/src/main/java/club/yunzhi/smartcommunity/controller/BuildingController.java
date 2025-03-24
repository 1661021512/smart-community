package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.Building;
import club.yunzhi.smartcommunity.entity.House;
import club.yunzhi.smartcommunity.entity.Resident;
import club.yunzhi.smartcommunity.entity.Unit;
import club.yunzhi.smartcommunity.service.BuildingService;
import com.fasterxml.jackson.annotation.JsonView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 住房管理
 */
@RestController
@RequestMapping("building")
public class BuildingController {
  private final Logger logger = LoggerFactory.getLogger(BuildingController.class);

  private final BuildingService buildingService;

  public BuildingController(BuildingService buildingService) {
    this.buildingService = buildingService;
  }

  @PostMapping
  @JsonView(AddJsonView.class)
  public Building save(@RequestBody Building building) {
    return this.buildingService.save(building);
  }

  @DeleteMapping("{id}")
  public void delete(@PathVariable Long id) {
    this.buildingService.delete(id);
  }

  @GetMapping("getByVillageId/{id}")
  @JsonView(getAllByVillageId.class)
  public List<Building> getAllByVillageId(@PathVariable Long id) {
    return this.buildingService.getAllByVillageId(id);
  }

  @GetMapping("{id}")
  @JsonView(GetByIdJsonView.class)
  public Building getById(@PathVariable Long id) {
    return this.buildingService.getById(id);
  }

  @GetMapping("getByIdWithUnitsAndResidents/{id}")
  @JsonView(GetByIdWithUnitsAndResidentsJsonView.class)
  public Building getByIdWithUnitsAndResidents(@PathVariable Long id) {
    return this.buildingService.getById(id);
  }

  @GetMapping("page")
  @JsonView(PageJsonView.class)
  public Page<Building> page(
      @RequestParam(required = false, defaultValue = "") String name,
      @RequestParam(required = false) Long villageId,
      @RequestParam(required = false) Short houseType,
      @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC))
          Pageable pageable
  ) {
    return this.buildingService.page(name, villageId, houseType, pageable);
  }

  @PutMapping("{id}")
  @JsonView(UpdateJsonView.class)
  public Building update(@PathVariable Long id, @RequestBody Building Building) {
    return this.buildingService.update(id, Building);
  }

  private static class getAllByVillageId {
  }

  private static class AddJsonView implements Building.UnitJsonView, Building.VillageJsonView {
  }

  private static class GetByIdJsonView implements Building.UnitJsonView, Building.VillageJsonView {
  }

  private static class PageJsonView implements Building.UnitJsonView, Building.VillageJsonView {
  }

  private static class UpdateJsonView implements Building.UnitJsonView, Building.VillageJsonView {
  }

  private static class GetByIdWithUnitsAndResidentsJsonView implements Building.UnitJsonView,
      Unit.HouseJsonView, House.ResidentsJsonView, Resident.IdNumberJsonView, Resident.PhoneJsonView {
  }
}
