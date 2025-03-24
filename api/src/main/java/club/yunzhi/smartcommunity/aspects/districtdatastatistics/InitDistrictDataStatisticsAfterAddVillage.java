package club.yunzhi.smartcommunity.aspects.districtdatastatistics;

import club.yunzhi.smartcommunity.entity.District;
import club.yunzhi.smartcommunity.entity.DistrictDataStatistics;
import club.yunzhi.smartcommunity.repository.DistrictDataStatisticsRepository;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * 在新建小区之后初始化区域统计信息
 */
@Aspect
@Component
public class InitDistrictDataStatisticsAfterAddVillage {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  private final DistrictDataStatisticsRepository districtDataStatisticsRepository;

  public InitDistrictDataStatisticsAfterAddVillage(DistrictDataStatisticsRepository districtDataStatisticsRepository) {
    this.districtDataStatisticsRepository = districtDataStatisticsRepository;
  }

  /**
   * 新增小区、社区、乡镇后初始化区域统计信息（统计数据全部为0）
   * @param district
   */
  @AfterReturning(value = "execution(* club.yunzhi.smartcommunity.service.VillageService.save(..))" +
      "|| execution(* club.yunzhi.smartcommunity.service.CommunityService.save(..)) " +
      "|| execution(* club.yunzhi.smartcommunity.service.TownService.save(..))", returning = "district")
  public void afterReturnPage(District district) {
    DistrictDataStatistics districtDataStatistics = new DistrictDataStatistics();
    districtDataStatistics.setDistrict(district);
    this.districtDataStatisticsRepository.save(districtDataStatistics);
  }
}
