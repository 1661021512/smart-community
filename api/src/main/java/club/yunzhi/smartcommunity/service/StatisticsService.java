package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.dto.DistrictHouseAndResidentCountDto;
import club.yunzhi.smartcommunity.entity.Statistics;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * 数据统计
 */
public interface StatisticsService {
  List<DistrictHouseAndResidentCountDto> getSonDistrictHouseAndResidentCountOfCurrentUser();

  /**
   * 生成当日数据
   */
  void generateTodayData();

  /**
   * 获取最后一次统计的分页数据
   * @param userName 用户姓名
   * @param pageable 分页
   */
  Page<Statistics> pageOfLast(String userName, Pageable pageable);
}
