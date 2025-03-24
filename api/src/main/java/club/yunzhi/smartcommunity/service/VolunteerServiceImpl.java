package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Volunteer;
import club.yunzhi.smartcommunity.entity.WechatUser;
import club.yunzhi.smartcommunity.repository.VolunteerRepository;
import club.yunzhi.smartcommunity.repository.specs.VolunteerSpecs;
import com.mengyunzhi.core.exception.ObjectNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import java.util.List;

/**
 * 志愿者服务层
 */
@Service
public class VolunteerServiceImpl implements VolunteerService {
  private final static Logger logger = LoggerFactory.getLogger(VolunteerServiceImpl.class);
  private final VolunteerRepository volunteerRepository;
  private final WechatUserService wechatUserService;

  public VolunteerServiceImpl(VolunteerRepository volunteerRepository, WechatUserService wechatUserService) {
    this.volunteerRepository = volunteerRepository;
    this.wechatUserService = wechatUserService;
  }


  @Override
  public Volunteer cancelStar(Long id) {
    logger.debug("根据id获取实体");
    Volunteer volunteer = this.getById(id);

    logger.debug("取消志愿者的排名");
    volunteer.setBeStar(false);
    volunteer.setWeight(0);
    return this.volunteerRepository.save(volunteer);
  }

  @Override
  public boolean existsByCurrentWechatUser() {
    WechatUser wechatUser = this.wechatUserService.getCurrentLoginWechatUserWithoutTransaction()
        .orElseThrow(RuntimeException::new);
    return this.volunteerRepository.existsByWechatUserAndDeletedIsFalse(wechatUser);
  }

  @Override
  public List<Volunteer> getAllVolunteerStars() {
    return this.volunteerRepository.findAllByBeStarIsTrueAndDeletedIsFalse();
  }

  @Override
  public Volunteer getById(Long id) {
    return this.volunteerRepository.findById(id).orElseThrow(
        () -> new EntityNotFoundException("实体未找到"));
  }

  @Override
  public Volunteer getCurrentVolunteer() {
    WechatUser wechatUser = this.wechatUserService.getCurrentLoginWechatUserWithoutTransaction()
        .orElseThrow(RuntimeException::new);
    return this.volunteerRepository.findByWechatUserAndDeletedIsFalse(wechatUser)
        .orElseThrow(() -> new ObjectNotFoundException("当前微信用户尚未注册为志愿者"));
  }

  @Override
  public Volunteer saveOfCurrentWechatUser(String phone) {
    WechatUser wechatUser = this.wechatUserService.getCurrentLoginWechatUserWithoutTransaction()
        .orElseThrow(RuntimeException::new);
    Volunteer volunteer = new Volunteer();
    volunteer.setWechatUser(wechatUser);
    volunteer.setPhone(phone);
    this.volunteerRepository.save(volunteer);
    return volunteer;
  }

  @Override
  public Page<Volunteer> page(String name, Pageable pageable) {
    return this.volunteerRepository.findAll(VolunteerSpecs.containingName(name), pageable);
  }

  @Override
  public Volunteer setStar(Long id, Integer weight) {
    Assert.notNull(id, "id不能为空");
    Assert.notNull(weight, "排名不能为空");

    Volunteer newVolunteer = this.getById(id);
    newVolunteer.setWeight(weight);
    newVolunteer.setBeStar(true);
    return this.volunteerRepository.save(newVolunteer);
  }

  @Override
  public Volunteer updateCurrentVolunteerPhone(String phone) {
    Volunteer volunteer = this.getCurrentVolunteer();
    volunteer.setPhone(phone);
    this.volunteerRepository.save(volunteer);
    return volunteer;
  }

  @Override
  public Volunteer updateWeight(Long id, Integer weight) {
    Volunteer newVolunteer = this.getById(id);
    newVolunteer.setWeight(weight);
    return this.volunteerRepository.save(newVolunteer);
  }
}
