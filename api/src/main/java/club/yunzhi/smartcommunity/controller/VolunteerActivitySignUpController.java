package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.Volunteer;
import club.yunzhi.smartcommunity.entity.VolunteerActivitySignUp;
import club.yunzhi.smartcommunity.service.VolunteerActivitySignUpService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 志愿者活动报名信息
 */
@RestController
@RequestMapping("volunteerActivitySignUp")
public class VolunteerActivitySignUpController {
  private final VolunteerActivitySignUpService volunteerActivitySignUpService;

  public VolunteerActivitySignUpController(VolunteerActivitySignUpService volunteerActivitySignUpService) {
    this.volunteerActivitySignUpService = volunteerActivitySignUpService;
  }

  @PatchMapping("approved/{id}")
  @JsonView(ApprovedByIdJsonView.class)
  public VolunteerActivitySignUp approvedById(@PathVariable Long id) {
    return this.volunteerActivitySignUpService.approvedById(id);
  }

  /**
   * 当前登录微信用户是否已报名某个活动
   *
   * @param volunteerActivityId 活动ID
   */
  @GetMapping("existsByVolunteerActivityIdOfCurrentWechatUser/{volunteerActivityId}")
  public boolean existsByVolunteerActivityIdOfCurrentWechatUser(@PathVariable Long volunteerActivityId) {
    return this.volunteerActivitySignUpService.existsByVolunteerActivityIdOfCurrentWechatUser(volunteerActivityId);
  }


  /**
   * 获取某个志愿者活动的所有报名信息
   *
   * @param activityId 志愿者活动ID
   */
  @GetMapping("getAllByVolunteerActivityId/{activityId}")
  @JsonView(GetAllByVolunteerActivityIdJsonView.class)
  public List<VolunteerActivitySignUp> getAllByVolunteerActivityId(@PathVariable Long activityId) {
    return this.volunteerActivitySignUpService.getAllByVolunteerActivityId(activityId);
  }

  /**
   * 获取当前登录用户对某个活动的报名情况
   *
   * @param activityId 志愿者活动
   */
  @GetMapping("getByActivityIdOfCurrentWechatUser/{activityId}")
  @JsonView(GetByActivityIdOfCurrentWechatUserJsonView.class)
  public VolunteerActivitySignUp getByActivityIdOfCurrentWechatUser(@PathVariable Long activityId) {
    return this.volunteerActivitySignUpService.getByActivityIdOfCurrentWechatUser(activityId);
  }

  @PatchMapping("refused/{id}")
  @JsonView(RefusedByIdJsonView.class)
  public VolunteerActivitySignUp refusedById(@PathVariable Long id) {
    return this.volunteerActivitySignUpService.refusedById(id);
  }

  private static class GetByActivityIdOfCurrentWechatUserJsonView {
  }

  private static class GetAllByVolunteerActivityIdJsonView implements
      VolunteerActivitySignUp.VolunteerJsonView,
      Volunteer.WechatUserJsonView {
  }

  private static class ApprovedByIdJsonView {
  }

  private static class RefusedByIdJsonView {
  }
}
