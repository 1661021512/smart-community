package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.repository.PartyBuildingRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

@DataJpaTest
@Transactional
public class PartyBuildingSpecsTest {
  @Autowired
  PartyBuildingRepository partyBuildingRepository;

  @Test
  void equalDistrict() {
    partyBuildingRepository.findAll(PartBuildingSpecs.equalDistrictId(new Random().nextLong()));
  }
}
