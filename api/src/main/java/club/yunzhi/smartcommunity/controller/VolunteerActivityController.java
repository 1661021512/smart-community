package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.Attachment;
import club.yunzhi.smartcommunity.entity.VolunteerActivity;
import club.yunzhi.smartcommunity.service.VolunteerActivityService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.*;

/**
 * 志愿者活动管理
 */
@RestController
@RequestMapping("VolunteerActivity")
public class VolunteerActivityController {
  private final VolunteerActivityService volunteerActivityService;

  public VolunteerActivityController(VolunteerActivityService volunteerActivityService) {
    this.volunteerActivityService = volunteerActivityService;
  }

  @PostMapping("add")
  @JsonView(AddJsonView.class)
  public VolunteerActivity add(@RequestBody VolunteerActivity volunteerActivity) {
    return this.volunteerActivityService.add(volunteerActivity);
  }

  @PostMapping("applyOfCurrentVolunteer/{id}")
  public void applyOfCurrentVolunteer(@PathVariable Long id) {
    this.volunteerActivityService.applyOfCurrentVolunteer(id);
  }

  @DeleteMapping("{id}")
  public void deleteById(@PathVariable Long id) {
    this.volunteerActivityService.deleteById(id);
  }

  /**
   * 分页信息
   *
   * @param name             姓名
   * @param endDate          截止日期
   * @param state            状态
   * @param todayDate        当天日期
   * @param contact          联系人
   * @param place            地点
   * @param pageable         分页
   */
  @GetMapping("page")
  @JsonView(PageJsonView.class)
  public Page<VolunteerActivity> page(
      @RequestParam(required = false, defaultValue = "") String name,
      @RequestParam(required = false, defaultValue = "") Integer endDate,
      @RequestParam(required = false, defaultValue = "") Short state,
      @RequestParam(required = false, defaultValue = "") Integer todayDate,
      @RequestParam(required = false, defaultValue = "") String contact,
      @RequestParam(required = false, defaultValue = "") String place,
      @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC))
          Pageable pageable
  ) {
    return this.volunteerActivityService.page(name, endDate, state, todayDate, contact, place ,pageable);
  }

  @GetMapping("wechatPage")
  @JsonView(WechatPageJsonView.class)
  public Page<VolunteerActivity> wechatPage(
      @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC))
          Pageable pageable
  ) {
    return this.volunteerActivityService.wechatPage(pageable);
  }

  @GetMapping("{id}")
  @JsonView(GetByIdJsonView.class)
  public VolunteerActivity getById(@PathVariable Long id) {
    return this.volunteerActivityService.getById(id);
  }

  @PutMapping("{id}")
  @JsonView(UpdateJsonView.class)
  public VolunteerActivity update(@PathVariable Long id, @RequestBody VolunteerActivity volunteerActivity) {
    return this.volunteerActivityService.update(id, volunteerActivity);
  }


  public class AddJsonView {
  }

  public class PageJsonView {
  }

  public class WechatPageJsonView implements VolunteerActivity.ImageJsonView, Attachment.MyFileJsonView {
  }

  public class GetByIdJsonView implements VolunteerActivity.ImageJsonView, Attachment.MyFileJsonView {
  }

  public class UpdateJsonView {
  }
}
