package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.Cult;
import club.yunzhi.smartcommunity.service.CultService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 邪教管理
 */
@RestController
@RequestMapping("cult")
public class CultController {
  private final CultService cultService;

  public CultController(CultService cultService) {
    this.cultService = cultService;
  }

  @GetMapping("getTop20ByNameContains")
  @JsonView(FindTop20ByNameContainsJsonView.class)
  public List<Cult> findTop20ByNameContains(@RequestParam(defaultValue = "") String name) {
    return this.cultService.findTop20ByNameContains(name);
  }

  @PostMapping
  @JsonView(SaveJsonView.class)
  public Cult save(@RequestBody Cult cult) {
    return this.cultService.save(cult);
  }

  @PatchMapping("updateLastUsedTime/{id}")
  public void updateLastUsedTime(@PathVariable Long id) {
    this.cultService.updateLastUsedTime(id);
  }

  private class FindTop20ByNameContainsJsonView {
  }

  private class SaveJsonView {
  }
}
