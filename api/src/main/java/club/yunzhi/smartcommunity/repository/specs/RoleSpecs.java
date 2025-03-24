package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.entity.Role;
import org.springframework.data.jpa.domain.Specification;

/**
 * 角色查询
 */
public class RoleSpecs {
  public static Specification<Role> containingName(String name) {
    if (name != null && !name.trim().isEmpty()) {
      return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name.trim()));
    } else {
      return Specification.where(null);
    }
  }
}
