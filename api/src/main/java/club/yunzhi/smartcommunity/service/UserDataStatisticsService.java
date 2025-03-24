package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.WebUserDataStatistics;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


/**
 * 用户数据统计
 */
public interface UserDataStatisticsService {
  /**
   * 获取某个区域下管理的所有的用户信息
   * @param districtId 区域ID
   * @param pageable 分页
   */
  Page<WebUserDataStatistics> pageByBelongDistrictId(Long districtId, Pageable pageable);

  /**
   * 重新生成数据
   */
  void reGenerateData();
}
