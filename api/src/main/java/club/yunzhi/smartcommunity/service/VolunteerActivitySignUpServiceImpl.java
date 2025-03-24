package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Volunteer;
import club.yunzhi.smartcommunity.entity.VolunteerActivity;
import club.yunzhi.smartcommunity.entity.VolunteerActivitySignUp;
import club.yunzhi.smartcommunity.entity.WechatUser;
import club.yunzhi.smartcommunity.repository.VolunteerActivitySignUpRepository;
import com.mengyunzhi.core.exception.ObjectNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 志愿者活动报名记录
 */
@Service
public class VolunteerActivitySignUpServiceImpl implements VolunteerActivitySignUpService {
  private final WechatUserService wechatUserService;
  private final VolunteerActivitySignUpRepository volunteerActivitySignUpRepository;
  private final VolunteerService volunteerService;

  public VolunteerActivitySignUpServiceImpl(WechatUserService wechatUserService, VolunteerActivitySignUpRepository volunteerActivitySignUpRepository, VolunteerService volunteerService) {
    this.wechatUserService = wechatUserService;
    this.volunteerActivitySignUpRepository = volunteerActivitySignUpRepository;
    this.volunteerService = volunteerService;
  }

  @Override
  public VolunteerActivitySignUp approvedById(Long id) {
    VolunteerActivitySignUp volunteerActivitySignUp = this.volunteerActivitySignUpRepository.findById(id)
        .orElseThrow(() -> new ObjectNotFoundException("对应ID的记录未找到" + id));
    volunteerActivitySignUp.setStatus(VolunteerActivitySignUp.STATUS_ACCEPTED);
    this.volunteerActivitySignUpRepository.save(volunteerActivitySignUp);
    return volunteerActivitySignUp;
  }

  @Override
  public boolean existsByVolunteerActivityIdOfCurrentWechatUser(Long volunteerActivityId) {
    WechatUser wechatUser = this.wechatUserService.getCurrentLoginWechatUserWithoutTransaction()
        .orElseThrow(RuntimeException::new);
    return this.volunteerActivitySignUpRepository.existsByVolunteerActivityIdAndVolunteerWechatUserAndDeletedIsFalse(volunteerActivityId, wechatUser);
  }

  /**
   * 获取某个志愿者活动的所有报名信息
   *
   * @param activityId 志愿者活动ID
   */
  @Override
  public List<VolunteerActivitySignUp> getAllByVolunteerActivityId(Long activityId) {
    return this.volunteerActivitySignUpRepository.findAllByVolunteerActivityIdAndDeletedIsFalse(activityId);
  }

  @Override
  public VolunteerActivitySignUp getByActivityIdOfCurrentWechatUser(Long activityId) {
    Volunteer volunteer = this.volunteerService.getCurrentVolunteer();
    return this.volunteerActivitySignUpRepository.findByVolunteerAndVolunteerActivityIdAndDeletedIsFalse(volunteer, activityId)
        .orElseThrow(() -> new ObjectNotFoundException("未找到当前登录用户对应的活动ID"));
  }

  @Override
  public VolunteerActivitySignUp save(Volunteer volunteer, VolunteerActivity volunteerActivity) {
    VolunteerActivitySignUp signUp = new VolunteerActivitySignUp();
    signUp.setVolunteerActivity(volunteerActivity);
    signUp.setVolunteer(volunteer);
    this.volunteerActivitySignUpRepository.save(signUp);
    return signUp;
  }

  @Override
  public VolunteerActivitySignUp refusedById(Long id) {
    VolunteerActivitySignUp volunteerActivitySignUp = this.volunteerActivitySignUpRepository.findById(id)
        .orElseThrow(() -> new ObjectNotFoundException("对应ID的记录未找到" + id));
    volunteerActivitySignUp.setStatus(VolunteerActivitySignUp.STATUS_REFUSED);
    this.volunteerActivitySignUpRepository.save(volunteerActivitySignUp);
    return volunteerActivitySignUp;
  }
}
