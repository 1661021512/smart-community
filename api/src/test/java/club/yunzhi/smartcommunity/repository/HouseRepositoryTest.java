package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.Building;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Random;

class HouseRepositoryTest extends RepositoryTest {
  @Autowired
  HouseRepository houseRepository;
  @Test
  void countByBuilding() {
    Building building = new Building();
    building.setId(new Random().nextLong());
    this.houseRepository.countByBuildingAndDeletedIsFalse(building);
  }
}