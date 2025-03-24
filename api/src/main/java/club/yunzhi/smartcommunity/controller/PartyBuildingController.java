package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.PartyBuilding;
import club.yunzhi.smartcommunity.service.PartyBuildingService;
import com.fasterxml.jackson.annotation.JsonView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 党建管理
 */
@RestController
@RequestMapping("partyBuilding")
public class PartyBuildingController {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  private PartyBuildingService partyBuildingService;

  public PartyBuildingController(PartyBuildingService partyBuildingService) {
    this.partyBuildingService = partyBuildingService;
  }

  @DeleteMapping("{id}")
  public void deleteById(@PathVariable Long id) {
    this.partyBuildingService.deleteById(id);
  }

  @GetMapping("getAllByDistrictId/{districtId}")
  @JsonView(GetAllByDistrictId.class)
  public List<PartyBuilding> getAllByDistrictId(@PathVariable Long districtId) {
    return this.partyBuildingService.getAllByDistrictId(districtId);
  }

  @GetMapping("getAllOfCurrentUserDistrict")
  @JsonView(GetAllOfCurrentUserDistrictJsonView.class)
  public List<PartyBuilding> getAllOfCurrentUserDistrict() {
    return this.partyBuildingService.getAllOfCurrentUserDistrict();
  }

  @GetMapping("getByDutyIdAndDistrictId/{dutyId}/{districtId}")
  @JsonView(GetByDutyIdAndDistrictId.class)
  public PartyBuilding getByDutyIdAndDistrictId(@PathVariable Long dutyId,
                                                @PathVariable Long districtId) {
    return this.partyBuildingService.getByDutyIdAndDistrictId(dutyId, districtId);
  }

  @GetMapping("getByDutyIdOfCurrentDistrict/{dutyId}")
  @JsonView(GetByDutyIdOfCurrentDistrictJsonView.class)
  public PartyBuilding getByDutyIdOfCurrentDistrict(@PathVariable Long dutyId) {
    return this.partyBuildingService.getByDutyIdOfCurrentDistrict(dutyId);
  }

  @GetMapping("{id}")
  @JsonView(GetByIdJsonView.class)
  public PartyBuilding getById(@PathVariable Long id) {
    return this.partyBuildingService.getById(id);
  }

  @PostMapping
  @JsonView(SaveJsonView.class)
  public PartyBuilding save(@RequestBody PartyBuilding partyBuilding) {
    return this.partyBuildingService.save(partyBuilding);
  }

  @PostMapping("saveOfCurrentDistrict")
  @JsonView(SaveOfCurrentDistrictJsonView.class)
  public PartyBuilding saveOfCurrentDistrict(@RequestBody PartyBuilding partyBuilding) {
    return this.partyBuildingService.saveOfCurrentDistrict(partyBuilding.getDuty(), partyBuilding.getPersonName());
  }

  @PutMapping("{dutyId},{districtId}")
  @JsonView(UpdateJsonView.class)
  public PartyBuilding update(
      @PathVariable Long dutyId,
      @PathVariable Long districtId,
      @RequestBody PartyBuilding partyBuilding) {
    return this.partyBuildingService.update(dutyId, districtId, partyBuilding);
  }

  @PatchMapping("{id}")
  @JsonView(UpdateByIdJsonView.class)
  public PartyBuilding updateById(@PathVariable Long id, @RequestBody PartyBuilding partyBuilding) {
    return this.partyBuildingService.updateById(id, partyBuilding);
  }

  public static class GetByDutyIdAndDistrictId {
  }

  public static class GetAllOfCurrentUserDistrictJsonView
      implements PartyBuilding.DutyJsonView {
  }

  public static class SaveJsonView {
  }

  public static class UpdateJsonView {
  }

  public static class GetByIdJsonView implements
      PartyBuilding.DutyJsonView,
      PartyBuilding.DistrictJsonView {

  }

  public static class GetAllByDistrictId implements
      PartyBuilding.DutyJsonView {
  }

  private static class GetByDutyIdOfCurrentDistrictJsonView {
  }

  private static class SaveOfCurrentDistrictJsonView {
  }

  private class UpdateByIdJsonView {
  }
}
