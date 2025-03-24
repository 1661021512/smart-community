package club.yunzhi.smartcommunity.repository.specs;

import club.yunzhi.smartcommunity.entity.Community;
import club.yunzhi.smartcommunity.entity.District;
import club.yunzhi.smartcommunity.repository.DistrictRepository;
import club.yunzhi.smartcommunity.repository.ResidentRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;

/**
 * *
 * todo: 补充测试。保证查询不报错是基础
 */
@DataJpaTest
@Transactional
class ResidentSpecsTest {

  @Autowired
  ResidentRepository residentRepository;

  @Test
  void containingName() {
  }

  @Test
  void isSex() {
  }

  @Test
  void betweenAge() {
  }

  @Test
  void getTimeStamp() {
  }

  @Test
  void equalIdNumber() {
  }

  @Test
  void containingReligion() {
  }

  @Test
  void isRegionId() {
  }

  @Test
  void equalPhone() {
  }

  @Test
  void isNationality() {
  }

  @Test
  void isPoliticalClimate() {
  }

  @Test
  void isEducation() {
  }

  @Test
  void containingWorkPlace() {
  }

  @Test
  void inDistricts() {
    this.residentRepository.findAll(ResidentSpecs.belongDistrict(null));
    this.residentRepository.findAll(ResidentSpecs.belongDistrict(new District()));
    District district = new District();
    district.setId(123L);
    this.residentRepository.findAll(ResidentSpecs.belongDistrict(district));
    Community community = new Community();
    this.residentRepository.findAll(ResidentSpecs.belongDistrict(community));
  }

  @Test
  void equalVaccinated() {
   this.residentRepository.findAll(ResidentSpecs.equalVaccinated(true));
  }

}