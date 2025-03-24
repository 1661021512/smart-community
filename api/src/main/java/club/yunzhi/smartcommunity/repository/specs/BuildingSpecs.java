package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.entity.Building;
import club.yunzhi.smartcommunity.entity.District;
import club.yunzhi.smartcommunity.entity.Village;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.Assert;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

/**
 * 住房查询
 */
public class BuildingSpecs {
  /**
   * 包含名称的楼房
   *
   * @param name 名称
   * @return
   */
  public static Specification<Building> containingName(String name) {
    if (name != null && !name.trim().isEmpty()) {
      return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name.trim()));
    } else {
      return Specification.where(null);
    }
  }

  /**
   * 属于某个小区的楼房
   *
   * @param villageId 小区
   * @return
   */
  public static Specification<Building> belongToVillage(Long villageId) {
    if (villageId == null) {
      return Specification.where(null);
    }
    return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("parent").get("id").as(Long.class), villageId);
  }

  /**
   * 按平房\楼房查询
   * @param houseType 房屋类型（平房、楼房)
   */
  public static Specification<Building> equalHouseType(Short houseType) {
    if (houseType == null) {
      return Specification.where(null);
    }

    return (root, criteriaQuery, criteriaBuilder) ->
        criteriaBuilder.equal(root.get("houseType").as(Short.class), houseType);
  }

  /**
   * 根据小区数组获取楼房
   *
   * @param villageIds
   * @return
   */
  public static Specification<Building> inVillageIds(List<Long> villageIds) {
    return (root, criteriaQuery, criteriaBuilder) -> {
      CriteriaBuilder.In<Long> in = criteriaBuilder.in(root.join("parent").get("id").as(Long.class));
      for (Long villageId : villageIds) {
        in.value(villageId);
      }
      return in;
    };
  }
}
