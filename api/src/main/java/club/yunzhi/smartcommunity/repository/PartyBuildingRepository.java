package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.PartyBuilding;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

/**
 * 党建管理
 */
public interface PartyBuildingRepository extends PagingAndSortingRepository<PartyBuilding, Long>, JpaSpecificationExecutor<PartyBuilding> {
  /**
   * 根据岗位id和区域id获取党建人员信息
   *
   * @param dutyId 职位
   * @param districtId 区域
   * @return
   */
  PartyBuilding findByDutyIdAndDistrictIdAndDeletedIsFalse(Long dutyId, Long districtId);

  /**
   * 根据区域id获取该区域的所有党建人员信息
   *
   * @param districtId 区域
   * @return
   */
  List<PartyBuilding> findAllByDistrictIdAndDeletedIsFalse(Long districtId);
}
