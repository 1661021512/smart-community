package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.entity.Volunteer;
import org.springframework.data.jpa.domain.Specification;

/**
 * 构造志愿者查询条件
 */
public class VolunteerSpecs {
  public static Specification<Volunteer> containingName(String name) {
    if (name != null && !name.trim().isEmpty()) {
      return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name.trim()));
    } else {
      return Specification.where(null);
    }
  }
}
