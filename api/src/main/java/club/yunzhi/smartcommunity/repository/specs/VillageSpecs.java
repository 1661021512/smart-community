package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.entity.Village;
import org.modelmapper.internal.util.Assert;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

/**
 * 小区查询
 */
public class VillageSpecs {
  public static Specification<Village> containingName(String name) {
    if (name != null && !name.trim().isEmpty()) {
      return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name.trim()));
    } else {
      return Specification.where(null);
    }
  }

  /**
   * 根据社区数组获取小区
   *
   * @param communityIds
   * @return
   */
  public static Specification<Village> inCommunityIds(List<Long> communityIds) {
    return (root, criteriaQuery, criteriaBuilder) -> {
      CriteriaBuilder.In<Long> in = criteriaBuilder.in(root.join("parent").get("id").as(Long.class));
      for (Long communityid : communityIds) {
        in.value(communityid);
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
  public static Specification<Village> equalName(String name) {
    Assert.notNull(name, "name 不能为空");
    return (root, criteriaQuery, criteriaBuilder) ->
        criteriaBuilder.equal(root.get("name").as(String.class), name.trim());
  }

  /**
   * houseType
   *
   * @param houseType
   * @return
   */
  public static Specification<Village> isHouseType(Short houseType) {
    Assert.notNull(houseType, "houseType 不能为空");
    return (root, criteriaQuery, criteriaBuilder) ->
        criteriaBuilder.equal(root.get("houseType").as(Short.class), houseType);
  }
}
