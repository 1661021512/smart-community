package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Community;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * 社区管理服务层接口
 */
public interface CommunityService extends DistrictDeleteService {
  /**
   * 新增社区
   *
   * @param community
   * @return
   */
  Community save(Community community);

  /**
   * 删除社区
   *
   * @param id
   */
  void delete(Long id);

  /**
   * 获取所有社区
   *
   * @return
   */
  List<Community> findAll();

  /**
   * 根据id获取实体
   *
   * @param id
   * @return
   */
  Community getById(Long id);

  /**
   * 分页查询
   *
   * @param name
   * @param pageable
   * @return
   */
  Page<Community> page(String name, Pageable pageable);

  /**
   * 社区编辑
   *
   * @param id
   * @param community
   * @return
   */
  Community update(Long id, Community community);

  List<Community> getAllByTownId(Long townId);

  /**
   * 根据name判断实体是否存在
   *
   * @param name
   * @return
   */
  Boolean existByName(String name);
}
