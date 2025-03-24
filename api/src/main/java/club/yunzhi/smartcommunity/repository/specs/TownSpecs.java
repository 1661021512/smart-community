package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.entity.Town;
import org.modelmapper.internal.util.Assert;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

/**
 * 乡镇查询
 */
public class TownSpecs {
  public static Specification<Town> containingName(String name) {
    if (name != null && !name.trim().isEmpty()) {
      return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name.trim()));
    } else {
      return Specification.where(null);
    }
  }

  /**
   * 根据县数组获取乡镇
   *
   * @param countyIds
   * @return
   */
  public static Specification<Town> inCountyIds(List<Long> countyIds) {
    return (root, criteriaQuery, criteriaBuilder) -> {
      CriteriaBuilder.In<Long> in = criteriaBuilder.in(root.join("parent").get("id").as(Long.class));
      for (Long countyid : countyIds) {
        in.value(countyid);
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
  public static Specification<Town> equalName(String name) {
    Assert.notNull(name, "name 不能为空");
    return (root, criteriaQuery, criteriaBuilder) ->
        criteriaBuilder.equal(root.get("name").as(String.class), name.trim());
  }
}
