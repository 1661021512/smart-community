package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.Duty;
import club.yunzhi.smartcommunity.service.DutyService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 岗位管理
 */
@RestController
@RequestMapping("duty")
public class DutyController {
  private final DutyService dutyService;

  public DutyController(DutyService dutyService) {
    this.dutyService = dutyService;
  }

  @DeleteMapping("{id}")
  public void delete(@PathVariable Long id) {
    this.dutyService.delete(id);
  }

  @GetMapping("getAllByDistrictType/{type}")
  @JsonView(GetAllByDistrictType.class)
  public List<Duty> getAllByDistrictType(@PathVariable String type) {
    return this.dutyService.getAllByDistrictType(type);
  }

  @GetMapping("{id}")
  @JsonView(GetByIdJsonView.class)
  public Duty getById(@PathVariable Long id) {
    return this.dutyService.getById(id);
  }

  @GetMapping("page")
  @JsonView(PageJsonView.class)
  public Page<Duty> page(
          @RequestParam(required = false, defaultValue = "") String name,
          @PageableDefault(sort = {"weight"}, direction = Sort.Direction.ASC)
          Pageable pageable) {
    return this.dutyService.page(name, pageable);
  }

  @PostMapping()
  @JsonView(SaveJsonView.class)
  public Duty save(@RequestBody Duty duty) {
    return this.dutyService.save(duty);
  }

  @PutMapping("{id}")
  @JsonView(UpdateJsonView.class)
  public Duty update(@PathVariable Long id, @RequestBody Duty duty) {
    return this.dutyService.update(id, duty);
  }

  public static class PageJsonView {
  }

  public static class SaveJsonView {
  }

  public static class UpdateJsonView {
  }

  public static class GetAllByDistrictType {
  }

  private static class GetByIdJsonView {
  }
}
