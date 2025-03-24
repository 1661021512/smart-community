package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.controller.VolunteerActivityControllerTest;
import club.yunzhi.smartcommunity.entity.VolunteerActivity;
import club.yunzhi.smartcommunity.repository.specs.VolunteerActivitySpecs;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;


public class VolunteerActivityRepositoryTest extends RepositoryTest {
    private final Logger logger = LoggerFactory.getLogger(ResidentRepositoryTest.class);

    @Autowired
    VolunteerActivityRepository volunteerActivityRepository;

    /**
     * 志愿者-活动-分页查询：状态
     */
    @Test
    void isActive() {
        logger.debug("初始化测试数据并保存");

        VolunteerActivity volunteerActivity1 = VolunteerActivityControllerTest.getOneVolunteerActivity();
        volunteerActivity1.setImage(null);
        volunteerActivity1.setEndDate(20210101);
        volunteerActivityRepository.save(volunteerActivity1);

        VolunteerActivity volunteerActivity2 = VolunteerActivityControllerTest.getOneVolunteerActivity();
        volunteerActivity2.setEndDate(20210202);
        volunteerActivity2.setImage(null);
        volunteerActivityRepository.save(volunteerActivity2);

        VolunteerActivity volunteerActivity3 = VolunteerActivityControllerTest.getOneVolunteerActivity();
        volunteerActivity3.setEndDate(20210303);
        volunteerActivity3.setImage(null);
        volunteerActivityRepository.save(volunteerActivity3);

        logger.debug("查询数据");
        // 模拟今天的日期为20210202
        Integer todayDate = 20210202;

        // 模拟进行中的情况
        logger.debug("模拟进行中的情况");
        Short state = 0;
        List<VolunteerActivity> volunteerActivityList1 = this.volunteerActivityRepository.findAll(VolunteerActivitySpecs.isActive(state, todayDate));
        Assertions.assertEquals(1, volunteerActivityList1.size());

        // 模拟已结束的情况
        logger.debug("模拟已结束的情况");
        state = 1;
        List<VolunteerActivity> volunteerActivityList2 = this.volunteerActivityRepository.findAll(VolunteerActivitySpecs.isActive(state, todayDate));
        Assertions.assertEquals(1, volunteerActivityList1.size());
    }

}
