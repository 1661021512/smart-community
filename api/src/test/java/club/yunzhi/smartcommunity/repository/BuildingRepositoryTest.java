package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.Village;
import net.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

/**
 * 住房管理仓库层测试
 */
class BuildingRepositoryTest extends RepositoryTest {
  private final Logger logger = LoggerFactory.getLogger(BuildingRepositoryTest.class);
  @Autowired
  BuildingRepository buildingRepository;

  @Test
  void getAll() {
    Pageable pageable = PageRequest.of(1, 2);
    Village village = new Village();
    village.setId(1L);

    this.buildingRepository.getAll(
        RandomString.make(4),
        village.getId(),
        pageable);
  }
}