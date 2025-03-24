package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.Community;
import club.yunzhi.smartcommunity.entity.Grider;
import club.yunzhi.smartcommunity.entity.User;
import club.yunzhi.smartcommunity.entity.WebUser;
import club.yunzhi.smartcommunity.service.GriderService;
import com.fasterxml.jackson.annotation.JsonView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.*;

/**
 * 网格员管理
 */
@RestController
@RequestMapping("grider")
public class GriderController {
  private final Logger logger = LoggerFactory.getLogger(GriderController.class);
  private final GriderService griderService;

  public GriderController(GriderService griderService) {
    this.griderService = griderService;
  }

  @DeleteMapping("{id}")
  public void deleteById(@PathVariable Long id) {
    this.griderService.deleteById(id);
  }

  @GetMapping("existByGriderName")
  @JsonView(ExistByGriderNameJsonView.class)
  public Boolean existByGriderName(@RequestParam String username) {
    return this.griderService.existByGriderName(username);
  }

  @GetMapping("existByUsername")
  @JsonView(ExistByUsernameJsonView.class)
  public Boolean existByUsername(@RequestParam String username) {
    return this.griderService.existByUsername(username);
  }

  @GetMapping("{id}")
  @JsonView(GetByIdJsonViewWeb.class)
  public Grider getById(@PathVariable Long id) {
    return this.griderService.getById(id);
  }

  @GetMapping("getGriderByUserId/{id}")
  @JsonView(GetGriderByWebUserIdJsonView.class)
  public Grider getGriderByUserId(@PathVariable Long id) {
    return this.griderService.getGriderByUserId(id);
  }

  @GetMapping("page")
  @JsonView(PageJsonViewWeb.class)
  public Page<Grider> page(@RequestParam(required = false, defaultValue = "") String name,
                           @SortDefault.SortDefaults(@SortDefault(sort = "id",
                               direction = Sort.Direction.DESC)) Pageable pageable) {
    return this.griderService.page(name, pageable);
  }

  @PostMapping()
  @JsonView(SaveJsonView.class)
  public Grider save(@RequestBody Grider grider) {
    return this.griderService.save(grider);
  }

  @PutMapping("{id}")
  public void update(@PathVariable Long id, @RequestBody Grider grider) {
    this.griderService.updateById(id, grider);
  }


  public class SaveJsonView {
  }

  public class ExistByGriderNameJsonView {
  }

  public class ExistByUsernameJsonView {
  }

  public class GetGriderByWebUserIdJsonView implements Grider.WebUserJsonView {
  }

  public class PageJsonViewWeb implements
      Grider.CommunityJsonView,
      Grider.WebUserJsonView,
      WebUser.DistrictJsonView,
      User.DistrictJsonView,
      Community.TownJsonView {
  }

  public class GetByIdJsonViewWeb implements
      Grider.CommunityJsonView,
      Grider.WebUserJsonView,
      User.DistrictJsonView,
      Community.TownJsonView {
  }
}
