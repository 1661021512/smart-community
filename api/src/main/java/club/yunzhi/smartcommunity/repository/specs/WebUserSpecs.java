package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.entity.WebUser;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import java.util.List;

/**
 * 用户查询
 */
public class WebUserSpecs {
  public static Specification<WebUser> containingName(String name) {
    if (name == null || name.trim().isEmpty()) {
      return Specification.where(null);
    }

    return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder
        .like(root
                .join("user", JoinType.LEFT)
                .get("name").as(String.class),
            String.format("%%%s%%", name.trim()));
  }

  public static Specification<WebUser> equalUsername(String username) {
    if (username == null || username.trim().isEmpty()) {
      return Specification.where(null);
    }
    return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("username").as(String.class), String.format("%s%%", username.trim()));
  }

  /**
   * 根据区域数组获取区域
   *
   * @param districtsId
   * @return
   */
  public static Specification<WebUser> inDistrictIds(List<Long> districtsId) {
    if (districtsId == null) {
      return Specification.where(null);
    }
    return (root, criteriaQuery, criteriaBuilder) -> {
      CriteriaBuilder.In<Long> in = criteriaBuilder.in(
          root.join("user", JoinType.LEFT)
              .join("district", JoinType.LEFT)
              .get("id").as(Long.class));
      for (Long district : districtsId) {
        in.value(district);
      }
      return in;
    };
  }

  /**
   * 根据区域名称获取用户
   * 模糊查询
   * @param districtName
   * @return
   */
  public static Specification<WebUser> districtNameContains(String districtName) {
    if (districtName == null) {
      return Specification.where(null);
    }
    return (root, criteriaQuery, criteriaBuilder) -> {
      Predicate like = criteriaBuilder.like(
              root.join("user", JoinType.LEFT)
                  .join("district", JoinType.LEFT)
                  .get("name").as(String.class), "%" + districtName + "%");
      return like;
    };
  }
}