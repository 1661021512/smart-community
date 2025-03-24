package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Town;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TownService extends DistrictDeleteService {
  List<Town> findAll();

  /**
   * 新增
   *
   * @param town 乡镇
   * @return
   */
  Town save(Town town);

  /**
   * 删除
   *
   * @param id 删除
   */
  void delete(Long id);

  /**
   * 根据id获取town
   *
   * @param id
   * @return
   */
  Town getById(Long id);


  /**
   * 分页查看
   *
   * @param name
   * @param pageable
   * @return
   */
  Page<Town> page(String name, Pageable pageable);

  /**
   * 更新
   *
   * @return
   */
  Town update(Long id, Town town1);

  /**
   * 根据name判断实体是否存在
   *
   * @param name
   */
  Boolean existByName(String name);
}
