package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.Unit;
import club.yunzhi.smartcommunity.service.UnitService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 单元管理
 */
@RestController
@RequestMapping("unit")
public class UnitController {

  private final Logger logger = LoggerFactory.getLogger(TownController.class);

  private final UnitService unitService;

  public UnitController(UnitService unitService) {
    this.unitService = unitService;
  }

  @GetMapping("{id}")
  @JsonView(GetByIdJsonView.class)
  public Unit getById(@PathVariable Long id) {
    return this.unitService.getById(id);
  }

  @GetMapping("getByBuildingId/{id}")
  @JsonView(GetByBuildingId.class)
  public List<Unit> getByBuildingId(@PathVariable Long id) {
    return this.unitService.getByBuildingId(id);
  }

  @PostMapping
  @JsonView(SaveJsonView.class)
  public Unit save(@RequestBody Unit unit) {
    return this.unitService.save(unit);
  }


  @PutMapping("{id}")
  @JsonView(UpdateJsonView.class)
  public Unit update(@PathVariable Long id, @RequestBody Unit unit) {
    return this.unitService.update(id, unit);
  }

  private class GetByIdJsonView {
  }

  private class SaveJsonView implements Unit.BuildingJsonView {
  }

  private class UpdateJsonView {
  }

  private class GetByBuildingId {
  }
}
