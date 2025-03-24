package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.entity.VehicleType;
import org.springframework.data.jpa.domain.Specification;

/**
 * 车辆类型查询
 */
public class VehicleTypeSpecs {
  public static Specification<VehicleType> containingName(String name) {
    if (name != null && !name.trim().isEmpty()) {
      return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name.trim()));
    } else {
      return Specification.where(null);
    }
  }
}
