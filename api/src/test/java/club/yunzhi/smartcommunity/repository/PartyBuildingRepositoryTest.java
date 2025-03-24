package club.yunzhi.smartcommunity.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Random;

class PartyBuildingRepositoryTest extends RepositoryTest{
  @Autowired
  PartyBuildingRepository partyBuildingRepository;
  @Test
  void findByDutyIdAndDistrictIdAndDeletedIsFalse() {
    this.partyBuildingRepository
        .findByDutyIdAndDistrictIdAndDeletedIsFalse(new Random().nextLong(), new Random().nextLong());
  }

  @Test
  void findAllByDistrictIdAndDeletedIsFalse() {
    this.partyBuildingRepository
        .findAllByDistrictIdAndDeletedIsFalse(new Random().nextLong());
  }
}