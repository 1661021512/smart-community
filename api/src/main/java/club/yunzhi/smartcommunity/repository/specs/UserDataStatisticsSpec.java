package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.entity.District;
import club.yunzhi.smartcommunity.entity.WebUserDataStatistics;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;

import static club.yunzhi.smartcommunity.entity.District.*;

public class UserDataStatisticsSpec {

  public static Logger logger = LoggerFactory.getLogger(UserDataStatisticsSpec.class);

  /**
   * 属于某个区域
   * <p>
   * 根据区域类型动态生成查询条件
   * </p>
   *
   * @param district 区域
   */
  public static Specification<WebUserDataStatistics> belongDistrict(District district) {
    if (district == null ||
        district.getId() == null ||
        district.getType() == null ||
        TYPE_COUNTY.equals(district.getType())) {
      logger.debug("未传入区域信息或区域ID为null或传入了区域为根区域，忽略查询条件");
      return Specification.where(null);
    }

    return (root, criteriaQuery, criteriaBuilder) -> {
      Long districtId = district.getId();
      switch (district.getType()) {
        case TYPE_BUILDING:
          return criteriaBuilder.equal(root.join("building").get("id").as(Long.class), districtId);
        case TYPE_VILLAGE:
          return criteriaBuilder.equal(root.join("village").get("id").as(Long.class), districtId);
        case TYPE_COMMUNITY:
          return criteriaBuilder.equal(root.join("community").get("id").as(Long.class), districtId);
        case TYPE_TOWN:
          return criteriaBuilder.equal(root.join("town").get("id").as(Long.class), districtId);
        default:
          return criteriaBuilder.equal(root.join("county").get("id").as(Long.class), districtId);
      }
    };
  }
}
