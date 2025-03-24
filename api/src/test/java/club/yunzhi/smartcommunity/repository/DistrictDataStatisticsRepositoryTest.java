package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.District;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Random;

class DistrictDataStatisticsRepositoryTest extends RepositoryTest {
  @Autowired
  DistrictDataStatisticsRepository districtDataStatisticsRepository;

  @Test
  void findByDistrictId() {
    this.districtDataStatisticsRepository.findByDistrictId(new Random().nextLong());
  }

  @Test
  void findAllByDistrictParent() {
    District district = new District();
    district.setId(new Random().nextLong());
    this.districtDataStatisticsRepository.findAllByDistrictParent(district);
  }

  @Test
  void deleteAllByDistrictId() {
    this.districtDataStatisticsRepository.deleteAllByDistrictId(123L);
  }
}