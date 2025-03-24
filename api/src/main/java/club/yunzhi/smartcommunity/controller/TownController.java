package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.Attachment;
import club.yunzhi.smartcommunity.entity.District;
import club.yunzhi.smartcommunity.entity.Town;
import club.yunzhi.smartcommunity.service.TownService;
import com.fasterxml.jackson.annotation.JsonView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 乡镇管理
 */
@RestController
@RequestMapping("town")
public class TownController {
  private final Logger logger = LoggerFactory.getLogger(TownController.class);

  private final TownService townService;

  public TownController(TownService townService) {
    this.townService = townService;
  }

  @GetMapping
  @JsonView(GetAllJsonView.class)
  public List<Town> getAll() {
    return this.townService.findAll();
  }

  @PostMapping
  @JsonView(SaveJsonView.class)
  public Town save(@RequestBody Town town) {
    return this.townService.save(town);
  }

  @DeleteMapping("{id}")
  public void delete(@PathVariable Long id) {
    this.townService.delete(id);
  }

  @GetMapping("existByName")
  @JsonView(ExistByNameJsonView.class)
  public Boolean existName(@RequestParam String name) {
    return this.townService.existByName(name);
  }

  @GetMapping("{id}")
  @JsonView(GetByIdJsonView.class)
  public Town getById(@PathVariable Long id) {
    return this.townService.getById(id);
  }

  @GetMapping("page")
  @JsonView(PageJsonView.class)
  public Page<Town> page(
      @RequestParam(required = false, defaultValue = "") String name,
      @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC))
          Pageable pageable
  ) {
    return this.townService.page(name, pageable);
  }

  @PutMapping("{id}")
  @JsonView(UpdateJsonView.class)
  public Town update(@PathVariable Long id, @RequestBody Town town) {
    return this.townService.update(id, town);
  }

  private static class GetAllJsonView {
  }

  private static class SaveJsonView {
  }

  private static class GetByIdJsonView implements
      District.GeoJsonJsonView,
      Attachment.MyFileJsonView {
  }

  private static class PageJsonView {
  }

  private static class UpdateJsonView {
  }

  private static class ExistByNameJsonView {
  }
}
