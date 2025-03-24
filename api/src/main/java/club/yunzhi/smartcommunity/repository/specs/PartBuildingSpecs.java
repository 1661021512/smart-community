package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.entity.PartyBuilding;
import com.sun.istack.NotNull;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.Assert;

public class PartBuildingSpecs {
  /**
   * 按区域id查找
   *
   * @param districtId 区域id
   * @return
   */
  public static Specification<PartyBuilding> equalDistrictId(@NotNull Long districtId) {
    Assert.notNull(districtId, "区域id不能为空");
    return (root, criteriaQuery, criteriaBuilder) ->
        criteriaBuilder.equal(root.join("district").get("id").as(Long.class), districtId);
  }

  /**
   * 按岗位id查找
   *
   * @param dutyId 岗位id
   * @return
   */
  public static Specification<PartyBuilding> equalDutyId(@NotNull Long dutyId) {
    Assert.notNull(dutyId, "岗位id不能为空");
    return (root, criteriaQuery, criteriaBuilder) ->
        criteriaBuilder.equal(root.join("duty").get("id").as(Long.class), dutyId.longValue());
  }
}
