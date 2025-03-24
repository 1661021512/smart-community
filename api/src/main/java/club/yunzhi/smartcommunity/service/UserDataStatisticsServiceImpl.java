package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.District;
import club.yunzhi.smartcommunity.entity.WebUserDataStatistics;
import club.yunzhi.smartcommunity.entity.WebUser;
import club.yunzhi.smartcommunity.repository.DistrictRepository;
import club.yunzhi.smartcommunity.repository.UserDataStatisticsRepository;
import club.yunzhi.smartcommunity.repository.WebUserRepository;
import club.yunzhi.smartcommunity.repository.specs.UserDataStatisticsSpec;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class UserDataStatisticsServiceImpl implements UserDataStatisticsService {
  private final UserDataStatisticsRepository userDataStatisticsRepository;
  private final WebUserRepository webUserRepository;
  private final ResidentService residentService;
  private final DistrictRepository districtRepository;
  private final Logger logger = LoggerFactory.getLogger(this.getClass());


  public UserDataStatisticsServiceImpl(UserDataStatisticsRepository userDataStatisticsRepository,
                                       WebUserRepository webUserRepository, ResidentService residentService, DistrictRepository districtRepository) {
    this.userDataStatisticsRepository = userDataStatisticsRepository;
    this.webUserRepository = webUserRepository;
    this.residentService = residentService;
    this.districtRepository = districtRepository;
  }

  @Override
  public Page<WebUserDataStatistics> pageByBelongDistrictId(Long districtId, Pageable pageable) {
    District district = this.districtRepository.findById(districtId).orElseThrow(() -> new EntityNotFoundException("相关区域实体未找到" + districtId));
    return this.userDataStatisticsRepository.findAll(UserDataStatisticsSpec.belongDistrict(district), pageable);
  }

  @Async
  @Override
  public void reGenerateData() {
    this.logger.info("重新生成用户统计数据");
    this.userDataStatisticsRepository.deleteAll();

    List<WebUser> users = (List<WebUser>) this.webUserRepository.findAll();
    users.forEach(user -> {
      WebUserDataStatistics webUserDataStatistics = new WebUserDataStatistics();
      webUserDataStatistics.setWebUser(user);
      webUserDataStatistics.setEnterCount(this.residentService.countByCreateUser(user));
      this.userDataStatisticsRepository.save(webUserDataStatistics);
    });

    this.logger.info("用户统计数据生成完毕");
  }
}
