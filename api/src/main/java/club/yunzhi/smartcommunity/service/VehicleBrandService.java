package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.VehicleBrand;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface VehicleBrandService {
    /**
     * 删除
     *
     * @param id
     */
    void delete(Long id);

    /**
     * 判断车辆品牌名称是否已存在
     */
    Boolean existByName(String name);

    /**
     * 根据ID获取车辆品牌
     */
    VehicleBrand getById(Long id);

    /**
     * 根据name获取车辆品牌
     */
    VehicleBrand getByName(String name);

    /**
     * 分页
     *
     * @param name     品牌名称
     * @param pageable
     * @return
     */
    Page<VehicleBrand> page(String name, Pageable pageable);

    /**
     * 新增车辆品牌
     *
     * @param vehicleBrand 车辆品牌
     */
    VehicleBrand save(VehicleBrand vehicleBrand);

    /**
     * 更新车辆品牌名称
     *
     * @param id
     * @param vehicleBrand
     * @return
     */
    VehicleBrand update(Long id, VehicleBrand vehicleBrand);
}
