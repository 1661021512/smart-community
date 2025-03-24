package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.Enterprise;
import club.yunzhi.smartcommunity.service.EnterpriseService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("enterprise")
public class EnterpriseController {
  private final EnterpriseService enterpriseService;

  public EnterpriseController(EnterpriseService enterpriseService) {
    this.enterpriseService = enterpriseService;
  }

  @GetMapping("findTop20ByNameContains")
  @JsonView(FindTop20ByNameContainsJsonView.class)
  public List<Enterprise> findTop20ByNameContains(@RequestParam(defaultValue = "") String name) {
    return this.enterpriseService.findTop20ByNameContains(name);
  }

  @PostMapping
  @JsonView(SaveJsonView.class)
  public Enterprise save(@RequestBody Enterprise Enterprise) {
    return this.enterpriseService.save(Enterprise);
  }

  private class FindTop20ByNameContainsJsonView {
  }

  private class SaveJsonView {
  }
}
