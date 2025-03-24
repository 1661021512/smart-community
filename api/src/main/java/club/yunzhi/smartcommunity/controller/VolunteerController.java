package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.BaseEntity;
import club.yunzhi.smartcommunity.entity.Volunteer;
import club.yunzhi.smartcommunity.entity.VolunteerActivitySignUp;
import club.yunzhi.smartcommunity.entity.WechatUser;
import club.yunzhi.smartcommunity.service.VolunteerService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 志愿者管理
 */
@RestController
@RequestMapping("Volunteer")
public class VolunteerController {
  private final VolunteerService volunteerService;

  public VolunteerController(VolunteerService volunteerService) {
    this.volunteerService = volunteerService;
  }

  @PatchMapping("cancelStar/{id}")
  @JsonView(CancelStarJsonView.class)
  public Volunteer cancelStar(@PathVariable Long id) {
    return this.volunteerService.cancelStar(id);
  }

  /**
   * 当前登录用户是否已经注册过了志愿者
   */
  @GetMapping("existsByCurrentWechatUser")
  public boolean existsByCurrentWechatUser() {
    return this.volunteerService.existsByCurrentWechatUser();
  }

  @GetMapping("getAllVolunteerStars")
  @JsonView(GetAllVolunteerStarsJsonView.class)
  public List<Volunteer> getAllVolunteerStars() {
    return this.volunteerService.getAllVolunteerStars();
  }

  @GetMapping("getCurrentVolunteer")
  @JsonView(GetCurrentVolunteerJsonViewWechat.class)
  public Volunteer getCurrentVolunteer() {
    return this.volunteerService.getCurrentVolunteer();
  }

  @GetMapping("page")
  @JsonView(PageJsonViewWechat.class)
  public Page<Volunteer> page(@RequestParam(required = false, defaultValue = "") String name,
                              @SortDefault.SortDefaults({
                                  @SortDefault(sort = {"beStar"}, direction = Sort.Direction.DESC),
                                  @SortDefault(sort = {"weight"}, direction = Sort.Direction.ASC),
                                  @SortDefault(sort = {"id"}, direction = Sort.Direction.DESC),
                              }) Pageable pageable) {
    return this.volunteerService.page(name, pageable);
  }

  @PostMapping("saveOfCurrentWechatUser")
  @JsonView(SaveOfCurrentWechatUserJsonView.class)
  public Volunteer saveOfCurrentWechatUser(@RequestBody Volunteer volunteer) {
    return this.volunteerService.saveOfCurrentWechatUser(volunteer.getPhone());
  }

  @PatchMapping("setStar/{id}")
  @JsonView(BetStarJsonView.class)
  public Volunteer setStar(@PathVariable Long id, @RequestBody Volunteer volunteer) {
    return this.volunteerService.setStar(id, volunteer.getWeight());
  }

  @PutMapping("updateCurrentVolunteerPhone")
  @JsonView(UpdateCurrentVolunteerPhoneJsonView.class)
  public Volunteer updateCurrentVolunteerPhone(@RequestBody Volunteer volunteer) {
    return this.volunteerService.updateCurrentVolunteerPhone(volunteer.getPhone());
  }

  @PatchMapping("updateWeight/{id}")
  @JsonView(UpdateWeightJsonView.class)
  public Volunteer updateWeight(@PathVariable Long id, @RequestBody Volunteer volunteer) {
    return this.volunteerService.updateWeight(id, volunteer.getWeight());
  }

  public static class PageJsonViewWechat implements
      Volunteer.VolunteerActivitySignUpsJsonView,
      VolunteerActivitySignUp.VolunteerActivityJsonView,
      Volunteer.VolunteerActivityJsonView,
      BaseEntity.CreateTimeJsonView,
      Volunteer.WechatUserJsonView {
  }

  public static class BetStarJsonView {
  }

  public static class CancelStarJsonView {
  }

  private static class GetCurrentVolunteerJsonViewWechat implements Volunteer.WechatUserJsonView,
      WechatUser.MobileJsonView {
  }

  private static class UpdateCurrentVolunteerPhoneJsonView {
  }

  private static class SaveOfCurrentWechatUserJsonView {
  }

  private static class UpdateWeightJsonView {
  }

  private class GetAllVolunteerStarsJsonView implements
      Volunteer.WechatUserJsonView {
  }
}
