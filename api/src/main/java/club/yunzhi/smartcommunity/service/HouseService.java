package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.District;
import club.yunzhi.smartcommunity.entity.House;
import club.yunzhi.smartcommunity.input.UpdateOwner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * 房屋管理服务层
 */
public interface HouseService {
  long countByDistrict(District district);

  /**
   * 批量移除网格员
   *
   * @param houseIds 住房ID
   */
  void batchRemoveGrider(List<Long> houseIds);

  /**
   * 删除房屋
   *
   * @param id
   */
  void delete(Long id);

  /**
   * 获取所有房屋
   *
   * @param id 楼房id
   * @return
   */
  List<House> getAllByBuildingId(Long id);

  /**
   * 根据id获取实体
   *
   * @param id
   * @return
   */
  House getById(Long id);

  /**
   * 分页查询
   *
   * @param type             房屋类型
   * @param villageId        小区id
   * @param buildingId       楼房id
   * @param unitId           单元id
   * @param ownerName        户主姓名
   * @param griderId         网格员ID
   * @param excludedGriderId 不包含的网格员ID
   * @param isExcludedGriderIsNotNull 是否排除房屋指定了网格员的
   * @param pageable         分页
   * @return
   */
  Page<House> page(Short type,
                   Long villageId,
                   Long buildingId,
                   Long unitId,
                   String ownerName,
                   Long griderId,
                   Long excludedGriderId,
                   Boolean isExcludedGriderIsNotNull,
                   Pageable pageable);

  /**
   * 新增房屋
   *
   * @param house
   * @return
   */
  House save(House house);

  /**
   * 更新房子的门牌号
   *
   * @param id
   * @param house
   * @return
   */
  House updateHouseName(Long id, House house);

  /**
   * 更新房子的性质、面积、是否保障性住房，房屋补贴、入住时间、备注
   *
   * @param id
   * @param house
   * @return
   */
  House update(Long id, House house);

  /**
   * 更新户主信息
   *
   * @param id
   * @param updateOwner
   * @return
   */
  House updateOwner(Long id, UpdateOwner updateOwner);

  List<House> saveAll(List<House> houses);

  void removeGrider(Long id);

  Page<House> pageOfCurrentGrider(Short type,
                                  Long villageId,
                                  Long buildingId,
                                  Long unitId,
                                  String ownerName,
                                  Pageable pageable);

  void updateGrider(Long id, Long griderId);

}
