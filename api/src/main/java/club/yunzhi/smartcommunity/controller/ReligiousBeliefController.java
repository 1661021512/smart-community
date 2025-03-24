package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.ReligiousBelief;
import club.yunzhi.smartcommunity.service.ReligiousBeliefService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("religiousBelief")
public class ReligiousBeliefController {
  private final ReligiousBeliefService religiousBeliefService;

  public ReligiousBeliefController(ReligiousBeliefService religiousBeliefService) {
    this.religiousBeliefService = religiousBeliefService;
  }


  @GetMapping("findTop20ByNameContains")
  @JsonView(FindTop20ByNameContainsJsonView.class)
  public List<ReligiousBelief> findTop20ByNameContains(@RequestParam(defaultValue = "") String name) {
    return this.religiousBeliefService.findTop20ByNameContains(name);
  }

  @PostMapping
  @JsonView(SaveJsonView.class)
  public ReligiousBelief save(@RequestBody ReligiousBelief jobType) {
    return this.religiousBeliefService.save(jobType);
  }

  private class FindTop20ByNameContainsJsonView {
  }

  private class SaveJsonView {
  }
}
