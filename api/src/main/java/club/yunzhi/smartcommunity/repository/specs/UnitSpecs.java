package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.entity.Unit;
import org.springframework.data.jpa.domain.Specification;

public class UnitSpecs {
  public static Specification<Unit> isBuildingId(Long buildingId) {
    if (buildingId == null) {
      return Specification.where(null);
    }
    return (root, criteriaQuery, criteriaBuilder)
        -> criteriaBuilder.equal(root.get("building").get("id").as(Long.class), buildingId);
  }
}
