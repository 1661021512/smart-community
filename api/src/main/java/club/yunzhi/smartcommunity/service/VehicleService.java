package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Vehicle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * 车辆
 */
public interface VehicleService {

  /**
   * 删除
   *
   * @param id
   */
  void delete(Long id);

  /**
   * 根据ID获取车辆
   *
   * @param id
   * @return
   */
  Vehicle getById(Long id);

  /**
   * 车辆分页
   *
   * @param villageId   小区
   * @param typeId      车辆类型
   * @param plateNumber 车牌号
   * @param ownerName   车主姓名
   * @param pageable    分页
   * @return
   */
  Page<Vehicle> page(Long villageId,
                     Long typeId,
                     String plateNumber,
                     String ownerName,
                     Pageable pageable);

  /**
   * 新增车辆
   *
   * @param vehicle 车辆
   */
  Vehicle save(Vehicle vehicle);

  /**
   * 编辑车辆
   * @param id id
   * @param vehicle 车辆
   * @return
   */
  Vehicle update(Long id, Vehicle vehicle);
}
