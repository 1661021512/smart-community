package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.repository.BuildingRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.transaction.annotation.Transactional;


@DataJpaTest
@Transactional
class BuildingSpecsTest {
  @Autowired
  BuildingRepository buildingRepository;

  @Test
  public void equalHouseType() {
    this.buildingRepository.findAll(BuildingSpecs.equalHouseType((short) 1));
  }
}