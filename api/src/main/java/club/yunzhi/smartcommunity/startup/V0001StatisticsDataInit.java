package club.yunzhi.smartcommunity.startup;

import club.yunzhi.smartcommunity.repository.StatisticsLogRepository;
import club.yunzhi.smartcommunity.repository.StatisticsRepository;
import club.yunzhi.smartcommunity.service.StatisticsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;

@Component
public class V0001StatisticsDataInit implements ApplicationListener<ContextRefreshedEvent>, Ordered {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  public final static int order = V0000RoleDataInit.order + 1;
  private final StatisticsLogRepository statisticsLogRepository;
  private final StatisticsService statisticsService;

  public V0001StatisticsDataInit(StatisticsLogRepository statisticsLogRepository, StatisticsService statisticsService) {
    this.statisticsLogRepository = statisticsLogRepository;
    this.statisticsService = statisticsService;
  }

  @Override
  public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
    if (this.statisticsLogRepository.count() == 0) {
      this.logger.debug("生成当日统计数据");
      this.statisticsService.generateTodayData();
    }
  }

  @Override
  public int getOrder() {
    return order;
  }
}
