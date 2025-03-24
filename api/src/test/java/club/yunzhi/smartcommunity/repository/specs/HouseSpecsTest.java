package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.entity.Grider;
import club.yunzhi.smartcommunity.entity.House;
import club.yunzhi.smartcommunity.repository.HouseRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;

class HouseSpecsTest extends SpecsTest{
  @Autowired
  HouseRepository houseRepository;

  @Test
  void containingName() {
    this.houseRepository.count(HouseSpecs.containingName("zhangsan"));
  }

  @Test
  void belongToUnit() {
    this.houseRepository.count(HouseSpecs.belongToUnit(123L));
  }

  @Test
  void equalsGrider() {
    Grider grider = new Grider();
    grider.setId(new Random().nextLong());
    this.houseRepository.count(HouseSpecs.equalsGrider(grider));
  }

  @Test
  void griderIsNull() {
    this.houseRepository.count(HouseSpecs.griderIsNull());
  }
}