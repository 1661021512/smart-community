package club.yunzhi.smartcommunity.controller;
import club.yunzhi.smartcommunity.entity.Community;
import club.yunzhi.smartcommunity.entity.Village;
import club.yunzhi.smartcommunity.service.VillageService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 小区管理
 */
@RestController
@RequestMapping("Village")
public class VillageController {

  private final VillageService villageService;

  public VillageController(VillageService villageService) {
    this.villageService = villageService;
  }

  @DeleteMapping("{id}")
  public void deleteById(@PathVariable Long id) {
    this.villageService.delete(id);
  }

  @GetMapping("existByName")
  @JsonView(ExistByNameJsonView.class)
  public Boolean existName(@RequestParam String name) {
    return this.villageService.existByName(name);
  }

  @PostMapping
  @JsonView(AddJsonView.class)
  public Village save(@RequestBody Village village) {
    return this.villageService.save(village);
  }

  @GetMapping("getAll")
  @JsonView(GetAllJsonView.class)
  public List<Village> getAll() {
    return this.villageService.findAll();
  }

  @GetMapping("{id}")
  @JsonView(GetByIdJsonView.class)
  public Village getById(@PathVariable Long id) {
    return this.villageService.getById(id);
  }

  @GetMapping("page")
  @JsonView(PageJsonView.class)
  public Page<Village> page(
      @RequestParam(required = false, defaultValue = "") String name,
      @RequestParam Short houseType,
      @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC))
          Pageable pageable
  ) {
    return this.villageService.page(name, houseType, pageable);
  }

  @PutMapping("{id}")
  @JsonView(UpdateJsonView.class)
  public Village update(@PathVariable Long id, @RequestBody Village village) {
    return this.villageService.update(id, village);
  }

  private class AddJsonView implements Village.CommunityJsonView, Village.ModelJsonView {
  }

  private class GetAllJsonView implements Village.CommunityJsonView, Village.ModelJsonView, Community.TownJsonView {
  }

  private class GetByIdJsonView implements Village.CommunityJsonView, Village.ModelJsonView, Community.TownJsonView {
  }

  private class UpdateJsonView implements Village.CommunityJsonView, Village.ModelJsonView, Community.TownJsonView {
  }

  private class PageJsonView implements Village.CommunityJsonView, Community.TownJsonView {
  }

  private class ExistByNameJsonView {
  }
}
