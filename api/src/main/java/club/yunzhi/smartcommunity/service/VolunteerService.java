package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Volunteer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface VolunteerService {

  Volunteer cancelStar(Long id);

  boolean existsByCurrentWechatUser();

  /**
   * 获取所有的明星
   * @return
   */
  List<Volunteer> getAllVolunteerStars();

  Volunteer getById(Long id);

  Volunteer getCurrentVolunteer();

  Volunteer saveOfCurrentWechatUser(String phone);

  /**
   * 分页
   *
   * @param name
   * @param pageable
   * @return
   */
  Page<Volunteer> page(String name, Pageable pageable);

  /**
   * 设置排名
   *
   * @param id ID
   * @param weight 权重
   * @return
   */
  Volunteer setStar(Long id, Integer weight);

  Volunteer updateCurrentVolunteerPhone(String phone);

  /**
   * 更新权重
   * @param id ID
   * @param weight 权重
   * @return
   */
  Volunteer updateWeight(Long id, Integer weight);

}
