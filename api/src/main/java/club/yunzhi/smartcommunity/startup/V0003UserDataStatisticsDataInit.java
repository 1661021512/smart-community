package club.yunzhi.smartcommunity.startup;

import club.yunzhi.smartcommunity.repository.UserDataStatisticsRepository;
import club.yunzhi.smartcommunity.service.UserDataStatisticsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;

@Component
public class V0003UserDataStatisticsDataInit implements ApplicationListener<ContextRefreshedEvent>, Ordered {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  public final static int order = V0002DistrictDataStatisticsDataInit.order + 1;
  private final UserDataStatisticsRepository userDataStatisticsRepository;
  private final UserDataStatisticsService userDataStatisticsService;

  public V0003UserDataStatisticsDataInit(UserDataStatisticsRepository userDataStatisticsRepository,
                                         UserDataStatisticsService userDataStatisticsService) {
    this.userDataStatisticsRepository = userDataStatisticsRepository;
    this.userDataStatisticsService = userDataStatisticsService;
  }

  @Override
  public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
    if (this.userDataStatisticsRepository.count() == 0) {
      this.logger.info("生成用户统计信息");
      this.userDataStatisticsService.reGenerateData();
    }
  }

  @Override
  public int getOrder() {
    return order;
  }
}
