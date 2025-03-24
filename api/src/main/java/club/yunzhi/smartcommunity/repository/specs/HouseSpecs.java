package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.entity.*;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.List;

/**
 * 房屋查询
 */
public class HouseSpecs {
  /**
   * 属于某个单元的住房
   *
   * @param unitId 单元id
   * @return
   */
  public static Specification<House> belongToUnit(Long unitId) {
    if (unitId == null) {
      return Specification.where(null);
    }

    return (root, criteriaQuery, criteriaBuilder)
        -> criteriaBuilder.equal(root.join("unit")
        .get("id").as(Long.class), unitId);
  }

  /**
   * 按户主姓名查找
   *
   * @param ownerName 户主姓名
   * @return
   */
  public static Specification<House> containingName(String ownerName) {
    if (ownerName != null && !ownerName.trim().isEmpty()) {
      return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.join("owner", JoinType.LEFT).get("name").as(String.class), String.format("%%%s%%", ownerName.trim()));
    } else {
      return Specification.where(null);
    }
  }

  /**
   * 按网格员查询
   *
   * @param grider 网格员
   */
  public static Specification<House> equalsGrider(Grider grider) {
    if (grider == null) {
      return Specification.where(null);
    }
    return HouseSpecs.equalsGriderId(grider.getId());
  }

  /**
   * 按网格员查询
   *
   * @param griderId 网格员ID
   */
  public static Specification<House> equalsGriderId(Long griderId) {
    if (griderId == null) {
      return Specification.where(null);
    }

    return (root, criteriaQuery, criteriaBuilder) ->
        criteriaBuilder.equal(root.join("grider", JoinType.LEFT).get("id").as(Long.class),
            griderId);
  }

  /**
   * 网格员非空
   */
  public static Specification<House> griderIsNull() {
    return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.isNull(root.get("grider"));
  }

  /**
   * 按类型查找
   *
   * @param type
   * @return
   */
  public static Specification<House> isType(Short type) {
    if (type == null) {
      return Specification.where(null);
    }

    return (root, criteriaQuery, criteriaBuilder) ->
        criteriaBuilder.equal(root.get("type").as(Boolean.class), type);
  }

  /**
   * 位于某个区域中的
   *
   * @param districtIds
   * @return
   */
  public static Specification<House> inDistricts(List<District> districtIds) {
    if (districtIds == null) {
      return Specification.where(null);
    }
    return (root, criteriaQuery, criteriaBuilder) -> {
      CriteriaBuilder.In<Long> in = criteriaBuilder.in(root
          .join("building", JoinType.LEFT)
          .get("id").as(Long.class));
      for (District district : districtIds) {
        if (district != null && district.getId() != null) {
          in.value(district.getId());
        }
      }

      return in;
    };
  }

  /**
   * 不属于某个网格员
   *
   * @param excludedGriderId 网格员ID
   */
  public static Specification<House> notEqualsGriderId(Long excludedGriderId) {
    if (excludedGriderId == null) {
      return Specification.where(null);
    }

    // 由于House上的Grider是可以为null的
    // 如果在查询不等于grider.id时不加入grider为null的判断
    // 则查询不出grider为null的house数据
    return ((Specification<House>)
        (root, criteriaQuery, criteriaBuilder)
            -> criteriaBuilder.notEqual(
            root.join("grider", JoinType.LEFT)
                .get("id")
                .as(Long.class), excludedGriderId))
        .or((Specification<House>)
            (root, criteriaQuery, criteriaBuilder)
                -> criteriaBuilder.isNull(root.get("grider")));
  }
}
