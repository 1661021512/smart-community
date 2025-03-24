package club.yunzhi.smartcommunity.startup;

import club.yunzhi.smartcommunity.repository.DistrictDataStatisticsRepository;
import club.yunzhi.smartcommunity.service.DistrictDataStatisticsService;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;

/**
 * 区域数据统计信息
 */
@Component
public class V0002DistrictDataStatisticsDataInit implements ApplicationListener<ContextRefreshedEvent>, Ordered {
  public final static int order = V0001StatisticsDataInit.order + 1;
  private final DistrictDataStatisticsRepository districtDataStatisticsRepository;
  private final DistrictDataStatisticsService districtDataStatisticsService;
  public V0002DistrictDataStatisticsDataInit(DistrictDataStatisticsRepository districtDataStatisticsRepository,
                                             DistrictDataStatisticsService districtDataStatisticsService) {
    this.districtDataStatisticsRepository = districtDataStatisticsRepository;
    this.districtDataStatisticsService = districtDataStatisticsService;
  }

  @Override
  public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
    if (districtDataStatisticsRepository.count() == 0) {
      this.districtDataStatisticsService.reGenerateData();
    }
  }

  @Override
  public int getOrder() {
    return V0002DistrictDataStatisticsDataInit.order;
  }
}
