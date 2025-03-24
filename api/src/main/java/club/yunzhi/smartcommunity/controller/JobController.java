package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.BaseEntity;
import club.yunzhi.smartcommunity.entity.Job;
import club.yunzhi.smartcommunity.service.JobService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.*;

/**
 * 工作
 */
@RestController
@RequestMapping("job")
public class JobController {
  private final JobService jobService;

  public JobController(JobService jobService) {
    this.jobService = jobService;
  }

  @DeleteMapping("{id}")
  public void deleteById(@PathVariable Long id) {
    this.jobService.deleteById(id);
  }

  @GetMapping("{id}")
  @JsonView(GetByIdJsonView.class)
  public Job getById(@PathVariable Long id) {
    return this.jobService.getById(id);
  }

  @GetMapping("page")
  @JsonView(PageJsonView.class)
  public Page<Job> page(@SortDefault.SortDefaults({
      @SortDefault(sort = {"weight"}, direction = Sort.Direction.ASC),
      @SortDefault(sort = {"id"}, direction = Sort.Direction.DESC)
  }) Pageable pageable) {
    return this.jobService.page(pageable);
  }

  @PostMapping
  @JsonView(SaveJsonView.class)
  public Job save(@RequestBody Job job) {
    return this.jobService.save(job);
  }

  @PutMapping("{id}")
  @JsonView(UpdateJsonView.class)
  public Job updateById(@PathVariable Long id, @RequestBody Job job) {
    return this.jobService.updateById(id, job);
  }

  private static class PageJsonView implements
      BaseEntity.CreateTimeJsonView,
      BaseEntity.CreateUserJsonView {
  }

  private static class SaveJsonView {
  }

  private static class GetByIdJsonView {
  }

  private class UpdateJsonView {
  }
}
