package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.Skill;
import club.yunzhi.smartcommunity.service.SkillService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("skill")
public class SkillController {
  private final SkillService skillService;

  public SkillController(SkillService skillService) {
    this.skillService = skillService;
  }

  @GetMapping("findTop20ByNameContains")
  @JsonView(FindTop20ByNameContainsJsonView.class)
  public List<Skill> findTop20ByNameContains(@RequestParam(defaultValue = "") String name) {
    return this.skillService.findTop20ByNameContains(name);
  }

  @PostMapping
  @JsonView(SaveJsonView.class)
  public Skill save(@RequestBody Skill skill) {
    return this.skillService.save(skill);
  }

  @PatchMapping("updateLastUsedTime/{id}")
  public void updateLastUsedTime(@PathVariable Long id) {
    this.skillService.updateLastUsedTime(id);
  }

  private class FindTop20ByNameContainsJsonView {
  }

  private class SaveJsonView {
  }
}
