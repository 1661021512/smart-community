package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.JobType;
import club.yunzhi.smartcommunity.service.JobTypeService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 求职（工作）类型
 */
@RestController
@RequestMapping("jobType")
public class JobTypeController {
  private final JobTypeService jobTypeService;

  public JobTypeController(JobTypeService jobTypeService) {
    this.jobTypeService = jobTypeService;
  }

  @GetMapping("findTop20ByNameContains")
  @JsonView(FindTop20ByNameContainsJsonView.class)
  public List<JobType> findTop20ByNameContains(@RequestParam(defaultValue = "") String name) {
    return this.jobTypeService.findTop20ByNameContains(name);
  }

  @PostMapping
  @JsonView(SaveJsonView.class)
  public JobType save(@RequestBody JobType jobType) {
    return this.jobTypeService.save(jobType);
  }
  private class FindTop20ByNameContainsJsonView {
  }
  private class SaveJsonView {
  }
}
