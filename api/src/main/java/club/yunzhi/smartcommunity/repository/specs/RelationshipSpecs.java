package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.entity.Relationship;
import org.springframework.data.jpa.domain.Specification;

public class RelationshipSpecs {
  /**
   * 按姓名查找
   *
   * @param name 姓名
   * @return
   */
  public static Specification<Relationship> containingName(String name) {
    if (name != null && !name.trim().isEmpty()) {
      return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name.trim()));
    } else {
      return Specification.where(null);
    }
  }
}
