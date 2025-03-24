package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.entity.Community;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.Assert;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import java.util.List;

/**
 * 社区查询
 */
public class CommunitySpecs {
  public static Specification<Community> containingName(String name) {
    if (name != null && !name.trim().isEmpty()) {
      return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name.trim()));
    } else {
      return Specification.where(null);
    }
  }

  /**
   * 根据乡镇数组获取社区
   *
   * @param townIds
   * @return
   */
  public static Specification<Community> inTownIds(List<Long> townIds) {
    return (root, criteriaQuery, criteriaBuilder) -> {
      CriteriaBuilder.In<Long> in = criteriaBuilder.in(root.join("parent").get("id").as(Long.class));
      for (Long townId : townIds) {
        in.value(townId);
      }
      return in;
    };
  }

  /**
   * 等于name
   *
   * @param name
   * @return
   */
  public static Specification<Community> equalName(String name) {
    Assert.notNull(name, "name 不能为空");
    return (root, criteriaQuery, criteriaBuilder) ->
        criteriaBuilder.equal(root.get("name").as(String.class), name.trim());
  }
}
