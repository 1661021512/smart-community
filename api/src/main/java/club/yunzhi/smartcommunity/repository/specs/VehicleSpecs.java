package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.entity.Vehicle;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.JoinType;

public class VehicleSpecs {
  /**
   * 属于某个小区
   *
   * @param villageId 小区
   * @return
   */
  public static Specification<Vehicle> belongToVillage(Long villageId) {
    if (villageId == null) {
      return Specification.where(null);
    }
    return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.join("owner").join("houses").join("building", JoinType.LEFT).join("parent").get("id").as(Long.class), villageId);
  }

  /**
   * 属于某个车辆类型
   *
   * @param typeId 车辆类型
   * @return
   */
  public static Specification<Vehicle> belongToType(Long typeId) {
    if (typeId == null) {
      return Specification.where(null);
    }
    return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.join("type")
            .get("id")
            .as(Long.class), typeId);
  }

  /**
   * 按车主姓名查找
   *
   * @param ownerName 车主姓名
   * @return
   */
  public static Specification<Vehicle> containingName(String ownerName) {
    if (ownerName != null && !ownerName.trim().isEmpty()) {
      return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.join("owner", JoinType.LEFT).get("name").as(String.class), String.format("%%%s%%", ownerName.trim()));
    } else {
      return Specification.where(null);
    }
  }

  /**
   * 按车牌号查找
   *
   * @param plateNumber 车牌号
   * @return
   */
  public static Specification<Vehicle> containingPlateNumber(String plateNumber) {
    if (plateNumber != null && !plateNumber.trim().isEmpty()) {
      return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("plateNumber").as(String.class), String.format("%%%s%%", plateNumber.trim()));
    } else {
      return Specification.where(null);
    }
  }
}
