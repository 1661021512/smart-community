package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Building;
import club.yunzhi.smartcommunity.entity.District;
import club.yunzhi.smartcommunity.entity.DistrictDataStatistics;
import club.yunzhi.smartcommunity.repository.DistrictDataStatisticsRepository;
import club.yunzhi.smartcommunity.repository.HouseRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DistrictDataStatisticsServiceImpl implements DistrictDataStatisticsService {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  private final DistrictDataStatisticsRepository districtDataStatisticsRepository;
  private final DistrictService districtService;
  private final HouseRepository houseRepository;
  private final ResidentService residentService;

  public DistrictDataStatisticsServiceImpl(DistrictDataStatisticsRepository districtDataStatisticsRepository,
                                           DistrictService districtService,
                                           HouseRepository houseRepository,
                                           ResidentService residentService) {
    this.districtDataStatisticsRepository = districtDataStatisticsRepository;
    this.districtService = districtService;
    this.houseRepository = houseRepository;
    this.residentService = residentService;
  }

  @Override
  public DistrictDataStatistics findByDistrictId(Long districtId) {
    return this.districtDataStatisticsRepository.findByDistrictId(districtId).orElse(null);
  }

  @Override
  public DistrictDataStatistics findById(Long id) {
    return this.districtDataStatisticsRepository.findById(id).orElse(null);
  }

  @Override
  public List<DistrictDataStatistics> getSonDistrictDataByDistrictId(Long districtId) {
    District district = new District();
    district.setId(districtId);
    return this.districtDataStatisticsRepository.findAllByDistrictParent(district);
  }

  @Async
  @Override
  public void reGenerateData() {
    this.logger.info("重新生成区域数据");
    this.districtDataStatisticsRepository.deleteAll();

    this.logger.debug("依次生成每个building的统计数据");
    List<DistrictDataStatistics> buildingDataStatistics = new ArrayList<>();
    List<District> districts = this.districtService.getAllDistrictsByType(District.TYPE_BUILDING);
    districts.forEach(district -> {
      DistrictDataStatistics dataStatistics = new DistrictDataStatistics();
      dataStatistics.setDistrict(district);
      Building building = new Building();
      building.setId(district.getId());
      dataStatistics.setHouseCount(this.houseRepository.countByBuildingAndDeletedIsFalse(building));
      dataStatistics.setResidentCount(this.residentService.countByDistrict(district));
      dataStatistics.setPartyMemberCount(this.residentService.countPartyMemberByDistrict(district));
      dataStatistics.setCovid19DefensedCount(this.residentService.countVaccinatedByDistrict(district));
      this.districtDataStatisticsRepository.save(dataStatistics);
      buildingDataStatistics.add(dataStatistics);
    });

    this.logger.debug("生成小区的统计数据");
    List<DistrictDataStatistics> villageDataStatistics = this.generateData(buildingDataStatistics, District.TYPE_VILLAGE);

    this.logger.debug("生成社区统计数据");
    List<DistrictDataStatistics> communityDataStatistics = this.generateData(villageDataStatistics, District.TYPE_COMMUNITY);

    this.logger.debug("生成乡镇统计数据");
    List<DistrictDataStatistics> townDataStatistics = this.generateData(communityDataStatistics, District.TYPE_TOWN);

    this.logger.debug("生成当前县的总数");
    District county = this.districtService.getCounty();
    DistrictDataStatistics countyDataStatistics = new DistrictDataStatistics();
    countyDataStatistics.setDistrict(county);
    townDataStatistics.forEach(townData -> this.appendData(countyDataStatistics, townData));
    this.districtDataStatisticsRepository.save(countyDataStatistics);

    this.logger.info("区域统计信息生成完毕");
  }

  @Override
  public void deleteAllByDistrictId(Long districtId) {
    this.districtDataStatisticsRepository.deleteAllByDistrictId(districtId);
  }

  /**
   * 追加数据
   *
   * @param targetDataStatistics 被追加的数据
   * @param dataStatistics       追加的数据
   */
  void appendData(DistrictDataStatistics targetDataStatistics, DistrictDataStatistics dataStatistics) {
    targetDataStatistics.setHouseCount(targetDataStatistics.getHouseCount() + dataStatistics.getHouseCount());
    targetDataStatistics.setResidentCount(targetDataStatistics.getResidentCount() + dataStatistics.getResidentCount());
    targetDataStatistics.setCovid19DefensedCount(targetDataStatistics.getCovid19DefensedCount() + dataStatistics.getCovid19DefensedCount());
    targetDataStatistics.setPartyMemberCount(targetDataStatistics.getPartyMemberCount() + dataStatistics.getPartyMemberCount());
  }

  /**
   * 计算每个类型的区域内的统计数据
   * <p>
   * 将子区域内的信息进行叠加
   * 要求有事务支持
   * </p>
   *
   * @param sonDistrictDataStatistics 子区域的数据统计信息
   * @param districtType              区域类型
   */
  public List<DistrictDataStatistics> generateData(List<DistrictDataStatistics> sonDistrictDataStatistics,
                                                   String districtType) {
    List<DistrictDataStatistics> resultDataStatistics = new ArrayList<>();
    List<District> villages = this.districtService.getAllDistrictsByType(districtType);
    villages.forEach(village -> {
      DistrictDataStatistics dataStatistics = new DistrictDataStatistics();
      dataStatistics.setDistrict(village);
      sonDistrictDataStatistics.forEach(sonDistrictData -> {
        // 防止软删除引发的父区域为null的情况
        if (sonDistrictData.getDistrict().getParent() != null &&
            sonDistrictData.getDistrict().getParent().getId().equals(village.getId())) {
          this.appendData(dataStatistics, sonDistrictData);
        }
      });
      this.districtDataStatisticsRepository.save(dataStatistics);
      resultDataStatistics.add(dataStatistics);
    });

    return resultDataStatistics;
  }
}
