package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.*;
import club.yunzhi.smartcommunity.repository.VolunteerActivityRepository;
import club.yunzhi.smartcommunity.repository.specs.VolunteerActivitySpecs;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * 志愿者活动管理
 */
@Service
public class VolunteerActivityServiceImpl implements VolunteerActivityService {
  private final static Logger logger = LoggerFactory.getLogger(VolunteerActivityServiceImpl.class);
  private final VolunteerActivityRepository volunteerActivityRepository;
  /**
   * 志愿者
   */
  private final VolunteerService volunteerService;

  /**
   * 志愿者活动报名记录
   */
  private final VolunteerActivitySignUpService volunteerActivitySignUpService;

  public VolunteerActivityServiceImpl(VolunteerActivityRepository volunteerActivityRepository, VolunteerService volunteerService, VolunteerActivitySignUpService volunteerActivitySignUpService) {
    this.volunteerActivityRepository = volunteerActivityRepository;
    this.volunteerService = volunteerService;
    this.volunteerActivitySignUpService = volunteerActivitySignUpService;
  }

  @Override
  public VolunteerActivity add(VolunteerActivity volunteerActivity) {
    logger.debug("对数据进行断言");
    Assert.notNull(volunteerActivity.getContact(), "联系人不能为空");
    Assert.notNull(volunteerActivity.getPlace(), "地点不能为空");
    Assert.notNull(volunteerActivity.getName(), "活动名称不能为空");
    Assert.notNull(volunteerActivity.getInitiator(), "发起组织不能为空");
    Assert.notNull(volunteerActivity.getDetail(), "活动详情不能为空");
    Assert.notNull(volunteerActivity.getEndDate(), "结束日期不能为空");
    Assert.notNull(volunteerActivity.getImage(), "图片不能为空");
    Assert.notNull(volunteerActivity.getNumberOfPlanned(), "计划招募人数不能为空");

    logger.debug("对数据进行赋值并保存");
    VolunteerActivity volunteerActivity1 = new VolunteerActivity();
    volunteerActivity1.setName(volunteerActivity.getName());
    volunteerActivity1.setContact(volunteerActivity.getContact());
    volunteerActivity1.setPlace(volunteerActivity.getPlace());
    volunteerActivity1.setInitiator(volunteerActivity.getInitiator());
    volunteerActivity1.setDetail(volunteerActivity.getDetail());
    volunteerActivity1.setEndDate(volunteerActivity.getEndDate());
    volunteerActivity1.setImage(volunteerActivity.getImage());
    volunteerActivity1.setNumberOfPlanned(volunteerActivity.getNumberOfPlanned());
    return this.volunteerActivityRepository.save(volunteerActivity1);
  }

  @Override
  public void applyOfCurrentVolunteer(Long id) {
    VolunteerActivity volunteerActivity = new VolunteerActivity();
    volunteerActivity.setId(id);
    Volunteer volunteer = this.volunteerService.getCurrentVolunteer();
    this.volunteerActivitySignUpService.save(volunteer, volunteerActivity);
  }

  @Override
  public void deleteById(Long id) {
    this.volunteerActivityRepository.deleteById(id);
  }

  @Override
  public VolunteerActivity getById(Long id) {
    return this.volunteerActivityRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("小区实体不存在"));
  }

  @Override
  public Page<VolunteerActivity> page(String name, Integer endDate, Short state, Integer todayDate, String contact, String place, Pageable pageable) {
    Specification<VolunteerActivity> specification = this.getSpec(name, endDate, state, todayDate, contact, place);
    return this.volunteerActivityRepository
        .findAll(specification, pageable);
  }

  /**
   * 获取综合查询条件
   *
   * @param name             姓名
   * @param endDate          截止日期
   * @param state            状态
   * @param todayDate        当天日期
   * @param contact          联系人
   * @param place            地点
   * @return
   */
  Specification<VolunteerActivity> getSpec(String name,
                                  Integer endDate,
                                  Short state,
                                  Integer todayDate,
                                  String contact,
                                  String place) {
    return VolunteerActivitySpecs.containingName(name)
            .and(VolunteerActivitySpecs.equalEndDate(endDate))
            .and(VolunteerActivitySpecs.isActive(state, todayDate))
            .and(VolunteerActivitySpecs.containingContact(contact))
            .and(VolunteerActivitySpecs.containingPlace(place));
  }

  @Override
  public Page<VolunteerActivity> wechatPage(Pageable pageable) {
    return this.volunteerActivityRepository
        .findAll(pageable);
  }

  /**
   * 更新已报名数量
   * 由于在执行异步方法时事务已经关闭
   * 所以城建在这里声明需要新事务
   *
   * @param id ID
   */
  @Async
  @Transactional(propagation = Propagation.REQUIRES_NEW)
  @Override
  public void updateNumberOfApplicants(Long id) {
    VolunteerActivity volunteerActivity = this.getById(id);
    volunteerActivity.setNumberOfApplicants(volunteerActivity.getVolunteerActivitySignUp().size());
    this.volunteerActivityRepository.save(volunteerActivity);
  }

  /**
   * 更新已审核数量
   * @param id ID
   */
  @Override
  @Async
  @Transactional(propagation = Propagation.REQUIRES_NEW)
  public void updateNumberOfAudits(Long id) {
    VolunteerActivity volunteerActivity = this.getById(id);
    AtomicInteger auditedCount = new AtomicInteger();
    volunteerActivity.getVolunteerActivitySignUp().forEach(volunteerActivitySignUp -> {
      if (volunteerActivitySignUp.getStatus() == VolunteerActivitySignUp.STATUS_ACCEPTED) {
        auditedCount.getAndIncrement();
      }
    });
    volunteerActivity.setNumberOfAudited(auditedCount.get());
    this.volunteerActivityRepository.save(volunteerActivity);
  }

  /**
   *
   * @param id ID
   * @param volunteerActivity 志愿者活动
   * @return 志愿者活动
   */
  @Override
  public VolunteerActivity update(Long id, VolunteerActivity volunteerActivity) {
    logger.debug("对数据进行断言");
    Assert.notNull(volunteerActivity.getContact(), "联系人不能为空");
    Assert.notNull(volunteerActivity.getPlace(), "地点不能为空");
    Assert.notNull(volunteerActivity.getName(), "活动名称不能为空");
    Assert.notNull(volunteerActivity.getInitiator(), "发起组织不能为空");
    Assert.notNull(volunteerActivity.getDetail(), "活动详情不能为空");
    Assert.notNull(volunteerActivity.getEndDate(), "结束日期不能为空");
    Assert.notNull(volunteerActivity.getImage(), "图片不能为空");
    Assert.notNull(volunteerActivity.getNumberOfPlanned(), "计划招募人数不能为空");

    logger.debug("对数据进行赋值并更新");
    VolunteerActivity newVolunteerActivity = this.getById(id);
    newVolunteerActivity.setName(volunteerActivity.getName());
    newVolunteerActivity.setContact(volunteerActivity.getContact());
    newVolunteerActivity.setPlace(volunteerActivity.getPlace());
    newVolunteerActivity.setInitiator(volunteerActivity.getInitiator());
    newVolunteerActivity.setDetail(volunteerActivity.getDetail());
    newVolunteerActivity.setEndDate(volunteerActivity.getEndDate());
    newVolunteerActivity.setImage(volunteerActivity.getImage());
    newVolunteerActivity.setNumberOfPlanned(volunteerActivity.getNumberOfPlanned());
    return this.volunteerActivityRepository.save(newVolunteerActivity);
  }
}
