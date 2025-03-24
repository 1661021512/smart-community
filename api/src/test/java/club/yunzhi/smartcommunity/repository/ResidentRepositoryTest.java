package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.controller.ResidentControllerTest;
import club.yunzhi.smartcommunity.entity.Resident;
import club.yunzhi.smartcommunity.repository.specs.ResidentSpecs;
import club.yunzhi.smartcommunity.util.IdCardUtil;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Random;


public class ResidentRepositoryTest extends RepositoryTest {
  private final Logger logger = LoggerFactory.getLogger(ResidentRepositoryTest.class);
  @Autowired
  ResidentRepository residentRepository;

  @Test
  void betweenAge() {
    logger.debug("首先初始化保存数据");
    Resident resident1 = ResidentControllerTest.getOneResident();
    // 2001年生人，21岁
    resident1.setIdNumber("130131200101130951");
    residentRepository.save(resident1);
    Resident resident2 = ResidentControllerTest.getOneResident();
    // 2003年生人，19岁
    resident2.setIdNumber("130131200301130956");
    residentRepository.save(resident2);
    Resident resident3 = ResidentControllerTest.getOneResident();
    // 2005年生人, 17岁
    resident3.setIdNumber("130131200501130950");
    residentRepository.save(resident3);

    logger.debug("查询数据");
    logger.debug("完整的年龄输入");
    List<Resident> residents = this.residentRepository.findAll(ResidentSpecs.betweenAge(18, 21));
    Assertions.assertEquals(1, residents.size());

    logger.debug("输入开始年龄的");
    Assertions.assertEquals(1, this.residentRepository.findAll(ResidentSpecs.betweenAge(21, null)).size());

    logger.debug("输入结束年龄的");
    Assertions.assertEquals(0, this.residentRepository.findAll(ResidentSpecs.betweenAge(null, 15)).size());
  }

  @Test
  void countAllByCreateUserIdAndDeletedIsFalse() {
    this.residentRepository.countAllByCreateUserIdAndDeletedIsFalse(new Random().nextLong());
  }

  @Test
  void findByIdNumberAndDeletedIsFalse() {
    this.residentRepository.findByIdNumberAndDeletedIsFalse("abc");
  }
}
