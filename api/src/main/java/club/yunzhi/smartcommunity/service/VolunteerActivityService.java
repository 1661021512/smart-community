package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.VolunteerActivity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * 志愿者活动管理
 */
public interface VolunteerActivityService {
  /**
   * 新增志愿者活动
   *
   * @param volunteerActivity
   * @return
   */
  VolunteerActivity add(VolunteerActivity volunteerActivity);

  /**
   * 当前登录的志愿者申请参与某次活动
   * @param id 参考的活动ID
   */
  void applyOfCurrentVolunteer(Long id);

  void deleteById(Long id);

  /**
   * 根据id获取实体
   * @param id
   * @return
   */
  VolunteerActivity getById(Long id);

  /**
   * 分页
   *
   * @param name             姓名
   * @param endDate          截止日期
   * @param state            状态
   * @param todayDate        当天日期
   * @param contact          联系人
   * @param place            地点
   * @param pageable         分页
   * @return 分页数据
   */
  Page<VolunteerActivity> page(String name, Integer endDate, Short state, Integer todayDate, String contact, String place, Pageable pageable);

  /**
   * 小程序端分页
   *
   * @param pageable
   * @return
   */
  Page<VolunteerActivity> wechatPage(Pageable pageable);

  /**
   * 更新已报名数量
   * @param id ID
   */
  void updateNumberOfApplicants(Long id);

  /**
   * 更新已审核数量
   * @param id ID
   */
  void updateNumberOfAudits(Long id);

  /**
   * 更新志愿者活动基本信息
   * @param id ID
   * @param volunteerActivity 志愿者活动
   * @return 志愿者活动
   */
  VolunteerActivity update(Long id, VolunteerActivity volunteerActivity);
}
