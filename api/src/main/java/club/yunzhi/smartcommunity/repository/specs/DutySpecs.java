package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.entity.Duty;
import org.springframework.data.jpa.domain.Specification;

/**
 * 职务查询构造
 */
public class DutySpecs {
  /**
   * 属于某个类型
   *
   * @param type 类型
   */
  public static Specification<Duty> equalType(String type) {
    if (type == null) {
      return Specification.where(null);
    }
    return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("typeOfDistrict").as(String.class), type.trim());
  }

  /**
   * 根据名称
   *
   * @param name 名称
   */
  public static Specification<Duty> containingName(String name) {
    if (name == null || name.trim().isEmpty()) {
      return Specification.where(null);
    } else {
      return (root, criteriaQuery, criteriaBuilder) ->
              criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name.trim()));
    }
  }
}
