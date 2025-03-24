package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 所有的调度都放这
 * 避免两个调用在时间上产生冲突
 */
@RestController
@RequestMapping("scheduled")
public class ScheduledController {
  private Logger logger = LoggerFactory.getLogger(this.getClass());
  /**
   * 录入统计
   */
  private final StatisticsService statisticsService;
  /**
   * 居民
   */
  private final ResidentService residentService;


  private final UserDataStatisticsService userDataStatisticsService;
  /**
   * 区域数据统计
   */
  private final DistrictDataStatisticsService districtDataStatisticsService;

  public ScheduledController(StatisticsService statisticsService,
                             ResidentService residentService,
                             UserDataStatisticsService userDataStatisticsService, DistrictDataStatisticsService districtDataStatisticsService) {
    this.statisticsService = statisticsService;
    this.residentService = residentService;
    this.userDataStatisticsService = userDataStatisticsService;
    this.districtDataStatisticsService = districtDataStatisticsService;
  }

  /**
   * 删除昨天生成的excel文件
   */
  @Scheduled(cron = "0 5 0 * * ?")
  @GetMapping("clearYesterdayExcelFile")
  public void clearHistoryExcel() {
    this.logger.info("开始清空昨天的EXCEL文件");
    this.residentService.clearYesterdayExcelFile();
  }

  /**
   * 更新录入数据
   */
  @Scheduled(cron = "0 15 0 * * ?")
  @GetMapping("updateEnterData")
  public void updateEnterData() {
    this.logger.info("开始记录截止到当天的录入数据");
    this.statisticsService.generateTodayData();
  }

  @Scheduled(cron = "0 45 0 * * ?")
  @GetMapping("reGenerateDistrictData")
  public void reGenerateDistrictData () {
    this.logger.info("开始更新区域上各项统计信息");
    this.districtDataStatisticsService.reGenerateData();
  }

  @Scheduled(cron = "0 45 0 * * ?")
  @GetMapping("reGenerateUserData")
  public void reGenerateUserData () {
    this.logger.info("重新生成用户数据");
    this.userDataStatisticsService.reGenerateData();
  }
}
