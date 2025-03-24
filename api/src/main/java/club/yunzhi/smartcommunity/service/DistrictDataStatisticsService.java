package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.DistrictDataStatistics;

import java.util.List;

/**
 * 区域数据统计
 */
public interface DistrictDataStatisticsService {

  DistrictDataStatistics findByDistrictId(Long districtId);

  /**
   * 查不到的话返回null
   * @param id ID
   */
  DistrictDataStatistics findById(Long id);

  List<DistrictDataStatistics> getSonDistrictDataByDistrictId(Long districtId);

  /**
   * 重新生成数据
   */
  void reGenerateData();

  void deleteAllByDistrictId(Long id);
}
