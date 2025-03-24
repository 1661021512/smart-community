package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Volunteer;
import club.yunzhi.smartcommunity.entity.VolunteerActivity;
import club.yunzhi.smartcommunity.entity.VolunteerActivitySignUp;

import java.util.List;

/**
 * 志愿者活动报名信息
 */
public interface VolunteerActivitySignUpService {

  /**
   * 审核通过
   * @param id 志愿者活动ID
   */
  VolunteerActivitySignUp approvedById(Long id);

  /**
   * 当前登录微信用户是否已报名某个活动
   *
   * @param volunteerActivityId 志愿者活动ID
   */
  boolean existsByVolunteerActivityIdOfCurrentWechatUser(Long volunteerActivityId);

  /**
   * 获取某个志愿者活动的所有报名信息
   * @param activityId 志愿者活动ID
   */
  List<VolunteerActivitySignUp> getAllByVolunteerActivityId(Long activityId);

  /**
   * 获取当前登录用户对某个活动的报名情况
   * @param activityId 志愿者活动
   */
  VolunteerActivitySignUp getByActivityIdOfCurrentWechatUser(Long activityId);

  /**
   * 新建
   * @param volunteer 志愿者
   * @param volunteerActivity 志愿者活动
   * @return
   */
  VolunteerActivitySignUp save(Volunteer volunteer, VolunteerActivity volunteerActivity);

  /**
   * 拒绝
   * @param id 志愿者活动ID
   */
  VolunteerActivitySignUp refusedById(Long id);
}
