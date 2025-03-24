package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Building;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * 住房服务层接口
 */
public interface BuildingService extends DistrictDeleteService {

  List<Building> getAllByVillageId(Long villageId);

  Building save(Building Building);

  /**
   * 删除
   *
   * @param id 删除
   */
  void delete(Long id);

  /**
   * 根据id获取Building
   *
   * @param id id
   * @return 楼栋
   */
  Building getById(Long id);


  /**
   * 分页查看
   *
   * @param name      名称
   * @param villageId 小区ID
   * @param houseType 房屋类型
   * @param pageable  分页
   * @return 分页数据
   */
  Page<Building> page(String name, Long villageId, Short houseType, Pageable pageable);

  /**
   * 更新
   *
   * @return 实体
   */
  Building update(Long id, Building Building1);
}
