package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.VehicleType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface VehicleTypeService {
  /**
   * 删除
   * @param id
   */
  void delete(Long id);

  /**
   * 获取全部车辆品牌
   */
  List<VehicleType> getAll();

  /**
   * 根据ID获取车辆类型
   */
  VehicleType getById(Long id);


  /**
   * 根据名称判断是否存在
   * id为可选参数
   * 传入id时，判断id对应实体的name是否与参数的name相同，相同返回true
   */
  Boolean nameIsAvailable(String name, Long id);

  /**
   * 分页
   * @param name 车辆类型名称
   * @param pageable
   * @return
   */
  Page<VehicleType> page(String name, Pageable pageable);

  /**
   * 新增车辆类型
   * @param vehicleType 车辆类型
   */
  VehicleType save(VehicleType vehicleType);

  /**
   * 车辆类型更新
   * @param id          id
   * @param vehicleType 车辆类型
   * @return
   */
  VehicleType update(Long id, VehicleType vehicleType);
}
