package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.entity.District;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;

import static club.yunzhi.smartcommunity.entity.District.*;

public class DistrictSpecs {
  public static Predicate belongDistrict(District district, Join<Object, District> buildingJoin, CriteriaBuilder criteriaBuilder) {
    Long districtId = district.getId();
    switch (district.getType()) {
      case TYPE_BUILDING:
        return criteriaBuilder.equal(buildingJoin.get("id").as(Long.class), districtId);
      case TYPE_VILLAGE:
        return criteriaBuilder.equal(buildingJoin
                .join("parent", JoinType.LEFT)
                .get("id").as(Long.class),
            districtId);
      case TYPE_COMMUNITY:
        return criteriaBuilder.equal(buildingJoin
                .join("parent", JoinType.LEFT)
                .join("parent", JoinType.LEFT)
                .get("id").as(Long.class),
            districtId);
      case TYPE_TOWN:
        return criteriaBuilder.equal(buildingJoin
                .join("parent", JoinType.LEFT)
                .join("parent", JoinType.LEFT)
                .join("parent", JoinType.LEFT)
                .get("id").as(Long.class),
            districtId);
      default:
        return criteriaBuilder.equal(buildingJoin
                .join("parent", JoinType.LEFT)
                .join("parent", JoinType.LEFT)
                .join("parent", JoinType.LEFT)
                .join("parent", JoinType.LEFT)
                .get("id").as(Long.class),
            districtId);
    }
  }
}
