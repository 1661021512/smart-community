package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.Volunteer;
import club.yunzhi.smartcommunity.entity.VolunteerActivitySignUp;
import club.yunzhi.smartcommunity.entity.WechatUser;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

/**
 * 志愿者活动报名
 */
public interface VolunteerActivitySignUpRepository extends PagingAndSortingRepository<VolunteerActivitySignUp, Long> {
  /**
   * 某个微信用户是否参与了某个活动
   *
   * @param volunteerActivityId 志愿者活动
   * @param wechatUser          微信用户
   * @return
   */
  boolean existsByVolunteerActivityIdAndVolunteerWechatUserAndDeletedIsFalse(Long volunteerActivityId, WechatUser wechatUser);

  List<VolunteerActivitySignUp> findAllByVolunteerActivityIdAndDeletedIsFalse(Long activityId);

  /**
   * 查找记录
   * @param volunteer 志愿者
   * @param activityId 活动ID
   * @return
   */
  Optional<VolunteerActivitySignUp> findByVolunteerAndVolunteerActivityIdAndDeletedIsFalse(Volunteer volunteer, Long activityId);
}
