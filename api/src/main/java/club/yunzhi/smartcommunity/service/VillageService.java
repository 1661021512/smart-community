package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Village;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface VillageService extends DistrictDeleteService {
  /**
   * 新增小区保存
   * @return 小区
   */
  Village save(Village village);

  /**
   * 小区更新
   * @param id
   * @param village
   * @return
   */
  Village update(Long id, Village village);

  /**
   * 根据id获取实体
   * @param id
   * @return
   */
  Village getById(Long id);

  /**
   * 分页查询
   *
   * @param name
   * @param houseType 房屋类型
   * @param pageable
   * @return
   */
  Page<Village> page(String name, Short houseType, Pageable pageable);

  /**
   * 获取所有小区
   * @return
   */
  List<Village> findAll();

  void delete(Long id);

  /**
   * 根据name判断实体是否存在
   *
   * @param name
   * @return
   */
  Boolean existByName(String name);
}
