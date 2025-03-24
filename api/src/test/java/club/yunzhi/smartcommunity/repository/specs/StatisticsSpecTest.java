package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.entity.StatisticsLog;
import club.yunzhi.smartcommunity.repository.StatisticsLogRepository;
import club.yunzhi.smartcommunity.repository.StatisticsRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class StatisticsSpecTest {
  @Autowired
  StatisticsRepository statisticsRepository;
  @Test
  void containingUserName() {
    this.statisticsRepository.count(StatisticsSpec.containingUserName("123"));
  }

  @Test
  void equalsStatisticsLog() {
    StatisticsLog statisticsLog = new StatisticsLog();
    statisticsLog.setId(new Random().nextLong());
    this.statisticsRepository.count(StatisticsSpec.equalsStatisticsLog(statisticsLog));
  }
}