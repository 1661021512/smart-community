package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.Utils;
import club.yunzhi.smartcommunity.dto.DistrictHouseAndResidentCountDto;
import club.yunzhi.smartcommunity.entity.*;
import club.yunzhi.smartcommunity.repository.StatisticsLogRepository;
import club.yunzhi.smartcommunity.repository.StatisticsRepository;
import club.yunzhi.smartcommunity.repository.WebUserRepository;
import club.yunzhi.smartcommunity.repository.specs.StatisticsSpec;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StatisticsServiceImpl implements StatisticsService {
  private final Logger logger = LoggerFactory.getLogger(StatisticsServiceImpl.class);
  private final WebUserService webUserService;
  private final HouseService houseService;
  private final ResidentService residentService;
  private final WebUserRepository webUserRepository;
  private final StatisticsRepository statisticsRepository;
  private final StatisticsLogRepository statisticsLogRepository;

  public StatisticsServiceImpl(WebUserService webUserService,
                               HouseService houseService,
                               ResidentService residentService,
                               WebUserRepository webUserRepository,
                               StatisticsRepository statisticsRepository, StatisticsLogRepository statisticsLogRepository) {
    this.webUserService = webUserService;
    this.houseService = houseService;
    this.residentService = residentService;
    this.webUserRepository = webUserRepository;
    this.statisticsRepository = statisticsRepository;
    this.statisticsLogRepository = statisticsLogRepository;
  }

  @Override
  public List<DistrictHouseAndResidentCountDto> getSonDistrictHouseAndResidentCountOfCurrentUser() {
    WebUser currentUser = this.webUserService.getCurrentLoginWebUser().orElseThrow(RuntimeException::new);
    List<District> districts = currentUser.getDistrict().getChildren();
    List<DistrictHouseAndResidentCountDto> result = new ArrayList<>();
    for (District district : districts) {
      DistrictHouseAndResidentCountDto districtHouseAndResidentCountDto = new DistrictHouseAndResidentCountDto();
      districtHouseAndResidentCountDto.setDistrict(district);
      districtHouseAndResidentCountDto.setHouseCount(this.houseService.countByDistrict(district));
      districtHouseAndResidentCountDto.setResidentCount(this.residentService.countByDistrict(district));
      result.add(districtHouseAndResidentCountDto);
    }
    return result;
  }

  @Override
  @Async
  public void generateTodayData() {
    logger.debug("获取所有的users");
    List<WebUser> users = (List<WebUser>) webUserRepository.findAll();

    logger.debug("调用静态方法，获取integer类型日期");
    Integer date = Utils.getCurrentDate();

    logger.debug("生成统计日志");
    StatisticsLog statisticsLog = this.statisticsLogRepository.save(new StatisticsLog());

    logger.debug("不清空数据表，直接新增新的");
    users.forEach(user -> {
      Statistics statistics = new Statistics();
      statistics.setWebUser(user);
      statistics.setStatisticsLog(statisticsLog);
      statistics.setDate(date);
      logger.debug("获取该用户的录入数量");
      Long totalCount = residentService.countByCreateUser(user);
      statistics.setTotalCount(totalCount);
      this.statisticsRepository.save(statistics);
    });


  }

  @Override
  public Page<Statistics> pageOfLast(String userName, Pageable pageable) {
    StatisticsLog statisticsLog = this.statisticsLogRepository.findTopOneByOrderByCreateTimeDesc().orElseGet(null);
    if (statisticsLog == null) {
      return Page.empty();
    }

    return this.statisticsRepository.findAll(StatisticsSpec.containingUserName(userName)
        .and(StatisticsSpec.equalsStatisticsLog(statisticsLog)), pageable);
  }
}
