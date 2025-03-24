package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.Community;
import club.yunzhi.smartcommunity.service.CommunityService;
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
 * 社区管理
 */
@RestController
@RequestMapping("community")
public class CommunityController {
  private final Logger logger = LoggerFactory.getLogger(BuildingController.class);
  private final CommunityService communityService;

  public CommunityController(CommunityService communityService) {
    this.communityService = communityService;
  }

  @PostMapping
  @JsonView(AddJsonView.class)
  public Community add(@RequestBody Community community) {
    return this.communityService.save(community);
  }

  @DeleteMapping("{id}")
  public void delete(@PathVariable Long id) {
    this.communityService.delete(id);
  }

  @GetMapping("existByName")
  @JsonView(ExistByNameJsonView.class)
  public Boolean existName(@RequestParam String name) {
    return this.communityService.existByName(name);
  }

  @GetMapping("page")
  @JsonView(PageJsonView.class)
  public Page<Community> page(
      @RequestParam(required = false, defaultValue = "") String name,
      @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC))
          Pageable pageable
  ) {
    return this.communityService.page(name, pageable);
  }

  @GetMapping("getAll")
  @JsonView(GetAllJsonView.class)
  public List<Community> getAll() {
    return this.communityService.findAll();
  }


  @GetMapping("{id}")
  @JsonView(GetByIdJsonView.class)
  public Community getById(@PathVariable Long id) {
    return this.communityService.getById(id);
  }

  @GetMapping("getByTownId/{townId}")
  @JsonView(GetByTownIdJsonView.class)
  public List<Community> getAllByTownId(@PathVariable Long townId) {
    return this.communityService.getAllByTownId(townId);
  }

  @PutMapping("{id}")
  @JsonView(UpdateJsonView.class)
  public Community update(@PathVariable Long id, @RequestBody Community community) {
    return this.communityService.update(id, community);
  }


  public class AddJsonView implements Community.TownJsonView {}
  public class UpdateJsonView implements Community.TownJsonView {}
  public class GetByIdJsonView implements Community.TownJsonView {}
  public class PageJsonView implements Community.TownJsonView {}
  public class GetAllJsonView implements Community.TownJsonView {}
  public class ExistByNameJsonView{}
  private class GetByTownIdJsonView {}
}
