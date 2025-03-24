package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.*;
import club.yunzhi.smartcommunity.input.UpdateOwner;
import club.yunzhi.smartcommunity.service.HouseService;
import club.yunzhi.smartcommunity.service.ResidentService;
import com.fasterxml.jackson.annotation.JsonView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 房屋管理
 */
@RestController
@RequestMapping("house")
public class HouseController {
  private final Logger logger = LoggerFactory.getLogger(HouseController.class);
  private final HouseService houseService;

  public HouseController(HouseService houseService) {
    this.houseService = houseService;
  }

  @PostMapping("addGrider/{id}")
  public void addGrider(@PathVariable Long id, @RequestParam Long griderId) {
    this.houseService.updateGrider(id, griderId);
  }

  /**
   * 批量移除网格员
   *
   * @param houseIds 住房IDS
   */
  @DeleteMapping("batchRemoveGrider")
  public void batchRemoveGrider(@RequestBody List<Long> houseIds) {
    this.houseService.batchRemoveGrider(houseIds);
  }

  @DeleteMapping("{id}")
  public void delete(@PathVariable Long id) {
    this.houseService.delete(id);
  }

  @GetMapping("getAllByBuildingId/{id}")
  @JsonView(GetAllByBuildingIdJsonView.class)
  public List<House> getAllByBuildingId(@PathVariable Long id) {
    return this.houseService.getAllByBuildingId(id);
  }

  @GetMapping("{id}")
  @JsonView(GetByIdJsonView.class)
  public House getById(@PathVariable Long id) {
    return this.houseService.getById(id);
  }

  /**
   * 分页查询
   *
   * @param houseType                 房屋类型
   * @param villageId                 小区ID
   * @param buildingId                楼栋ID
   * @param griderId                  网格员ID
   * @param excludedGriderId          排除的网格员ID
   * @param isExcludedGriderIsNotNull 是否排除房屋指定了网格员的
   * @param unitId                    单元ID
   * @param owner                     房主姓名
   * @param pageable                  分页
   */
  @GetMapping("page")
  @JsonView(PageJsonViewWeb.class)
  public Page<House> page(
      @RequestParam(required = false) Short houseType,
      @RequestParam(required = false) Long villageId,
      @RequestParam(required = false) Long buildingId,
      @RequestParam(required = false) Long griderId,
      @RequestParam(required = false) Long excludedGriderId,
      @RequestParam(required = false) Boolean isExcludedGriderIsNotNull,
      @RequestParam(required = false) Long unitId,
      @RequestParam(required = false, defaultValue = "") String owner,
      @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC)) Pageable pageable
  ) {
    return this.houseService.page(houseType,
        villageId,
        buildingId,
        unitId,
        owner,
        griderId,
        excludedGriderId,
        isExcludedGriderIsNotNull,
        pageable);
  }

  @GetMapping("pageOfCurrentGrider")
  @JsonView(PageByCurrentGriderJsonView.class)
  public Page<House> pageOfCurrentGrider(
      @RequestParam(required = false) Short houseType,
      @RequestParam(required = false) Long villageId,
      @RequestParam(required = false) Long buildingId,
      @RequestParam(required = false) Long unitId,
      @RequestParam(required = false, defaultValue = "") String owner,
      @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC)) Pageable pageable
  ) {
    return this.houseService.pageOfCurrentGrider(houseType,
        villageId,
        buildingId,
        unitId,
        owner,
        pageable);
  }

  @PostMapping
  @JsonView(SaveJsonView.class)
  public House save(@RequestBody House House) {
    return this.houseService.save(House);
  }

  /**
   * 移除住房上的网格员
   *
   * @param id 住户ID
   */
  @DeleteMapping("removeGrider/{id}")
  public void removeGrider(@PathVariable Long id) {
    this.houseService.removeGrider(id);
  }

  @PostMapping("saveAll")
  @JsonView(SaveAllJsonView.class)
  @ResponseStatus(HttpStatus.CREATED)
  public List<House> saveAll(@RequestBody List<House> houses) {
    return this.houseService.saveAll(houses);
  }


  @PutMapping("{id}")
  @JsonView(UpdateJsonView.class)
  public House update(@PathVariable Long id, @RequestBody House House) {
    return this.houseService.update(id, House);
  }

  @PutMapping("updateName/{id}")
  @JsonView(UpdateHouseNameJsonView.class)
  public House updateHouseName(@PathVariable Long id, @RequestBody House House) {
    return this.houseService.updateHouseName(id, House);
  }

  @PatchMapping("updateOwner/{id}")
  @JsonView(updateOwnerJsonView.class)
  public House updateOwner(@PathVariable Long id, @RequestBody UpdateOwner updateOwner) {
    return this.houseService.updateOwner(id, updateOwner);
  }

  public class UpdateJsonView {
  }

  public class UpdateHouseNameJsonView {
  }

  public class updateOwnerJsonView {
  }

  public class GetByIdJsonView implements
      House.UnitJsonView,
      House.OwnerJsonView,
      House.ResidentsJsonView,
      Resident.ReligiousBeliefJsonView,
      Building.VillageJsonView,
      Village.CommunityJsonView,
      Community.TownJsonView,
      Unit.BuildingJsonView {
  }

  public class PageJsonViewWeb implements House.UnitJsonView,
      House.OwnerJsonView,
      House.ResidentsJsonView,
      House.GriderJsonView,
      Resident.PhoneJsonView,
      Grider.WebUserJsonView,
      Unit.BuildingJsonView,
      Building.VillageJsonView,
      Village.CommunityJsonView,
      Community.TownJsonView,
      Town.CountyJsonView {
  }

  public class GetAllByBuildingIdJsonView implements House.UnitJsonView {
  }

  private class SaveAllJsonView {
  }

  private class SaveJsonView {
  }

  private class PageByCurrentGriderJsonView implements House.OwnerJsonView,
      House.ResidentsJsonView,
      House.UnitJsonView,
      Unit.BuildingJsonView,
      Building.VillageJsonView,
      Village.CommunityJsonView,
      Community.TownJsonView {
  }
}
