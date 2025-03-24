package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Grider;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface GriderService {
  /**
   * 根据id获取实体
   *
   * @param id
   * @return 网格员实体
   */
  Grider getById(Long id);

  /**
   * 根据id删除实体
   *
   * @param id
   */
  void deleteById(Long id);

  /**
   * 新增网格员
   *
   * @param grider
   * @return
   */
  Grider save(Grider grider);

  /**
   * 判断手机号是否已经在网格员注册
   *
   * @param username
   * @return
   */
  Boolean existByGriderName(String username);

  /**
   * 判断是否已经注册成网格员
   *
   * @param username
   * @return
   */
  Boolean existByUsername(String username);

  /**
   * 获取当前登录的网格员
   */
  Optional<Grider> getCurrentGrider();

  Grider getGriderByHouseId(Long houseId);

  /**
   * 通过用户id查询网格员表是否已经注册
   *
   * @param userId 用户id
   * @return
   */
  Grider getGriderByUserId(Long userId);

  /**
   * 分页查询
   *
   * @param name
   * @param pageable
   * @return
   */
  Page<Grider> page(String name, Pageable pageable);

  /**
   * 更新网格员基础信息
   * @param id ID
   * @param grider 网格员
   */
  void updateById(Long id, Grider grider);

  void updateHouseAndResidentCount(Long girder);

  void updateHouseAndResidentCountByGrider(Grider grider);
}
