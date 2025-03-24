package club.yunzhi.smartcommunity.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
class StatisticsLogRepositoryTest {
  @Autowired
  StatisticsLogRepository statisticsLogRepository;
  @Test
  void findTopOneOrderByCreateTimeDesc() {
    this.statisticsLogRepository.findTopOneByOrderByCreateTimeDesc();
  }
}