package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.District;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DistrictServiceTest {

  @Test
  void getAllChildren() {
    District district = new District();
    for(int i = 0; i< 10; i++) {
      District one = new District();
      district.getChildren().add(one);
      for(int j =0 ; j< 10; j++) {
        one.getChildren().add(new District());
      }
    }

    Assertions.assertEquals(110, DistrictService.getAllChildren(district).size());
  }
}