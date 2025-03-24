package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.District;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class DistrictRepositoryTest extends RepositoryTest {
  @Autowired
  DistrictRepository districtRepository;

  @Test
  void findAllByTypeAndDeletedIsFalse() {
    this.districtRepository.findAllByTypeAndDeletedIsFalse(District.TYPE_BUILDING);
  }
}