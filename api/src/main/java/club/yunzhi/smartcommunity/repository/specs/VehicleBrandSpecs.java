package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.entity.VehicleBrand;
import org.springframework.data.jpa.domain.Specification;

/**
 * 车辆品牌查询构造
 */
public class VehicleBrandSpecs {
    public static Specification<VehicleBrand> containingName(String name) {
        if (name != null && !name.trim().isEmpty()) {
            return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name.trim()));
        } else {
            return Specification.where(null);
        }
    }
}
