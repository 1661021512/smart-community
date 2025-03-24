package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.Resident;
import club.yunzhi.smartcommunity.entity.Volunteer;
import club.yunzhi.smartcommunity.service.ResidentService;
import club.yunzhi.smartcommunity.util.IdCardUtil;
import club.yunzhi.smartcommunity.util.SMSUtils;
import net.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.sql.Timestamp;
import java.util.Random;

public class ResidentControllerTest extends ControllerTest {
  private final static Logger logger = LoggerFactory.getLogger(ResidentControllerTest.class);
  private final String baseUrl = "/resident";

  @MockBean
  ResidentService residentService;

  public static Resident getOneResident() {
    Resident resident = new Resident();
    resident.setId(new Random().nextLong());
    resident.setNationality((short) (new Random().nextInt() % 2));
    resident.setSchool(new RandomString().nextString());
    resident.setIdNumber(IdCardUtil.getRandomID());
    resident.setPoliticalClimate((short) (new Random().nextInt() % 2));
    resident.setSchoolAddress(new RandomString().nextString());
    resident.setLocalDomicile(new Random().nextBoolean());
    resident.setMaritalStatus((short) (new Random().nextInt() % 2));
    resident.setPhone(SMSUtils.getRandomPhone());
    resident.setWorkPlace(new RandomString().nextString());
    resident.setRemarks(new RandomString().nextString());
    resident.setEducation((short) (new Random().nextInt() % 2));
    resident.setFloatedPlace(new RandomString().nextString());
    resident.setFloatedDate(new Timestamp(System.currentTimeMillis()));
    resident.setBeVolunteer(new Random().nextBoolean());
    resident.setBeStudent(new Random().nextBoolean());
    resident.setBeStudent(new Random().nextBoolean());
    resident.setBeNuclear(new Random().nextBoolean());
    resident.setBeLonelyOrWidowed(new Random().nextBoolean());
    resident.setBeVolunteer(new Random().nextBoolean());
    resident.setBeSoldier(new Random().nextBoolean());
    resident.setBeLeftBehindChildren(new Random().nextBoolean());
    resident.setBeSubsistenceAllowances(new Random().nextBoolean());
    resident.setBeOldAgeAllowance(new Random().nextBoolean());
    resident.setBeMedicalInsurance(new Random().nextBoolean());
    resident.setBeEndowmentInsurance(new Random().nextBoolean());
    resident.setBeCrimed(new Random().nextBoolean());
    resident.setBeDisabled(new Random().nextBoolean());
    resident.setBeChronicDisease(new Random().nextBoolean());
    resident.setBeEmptyNest(new Random().nextBoolean());
    resident.setBeLonelyOrWidowed(new Random().nextBoolean());
    return resident;
  }

  @Test
  void addHouse() throws Exception {
    logger.debug("构造请求信息");
    Long id = new Random().nextLong();
    Long houseId = new Random().nextLong();
    String url =this.baseUrl + "/addHouseIfNotExist/" + id.toString();

    mockMvc.perform(MockMvcRequestBuilders.patch(url)
        .queryParam("houseId", houseId.toString()))
        .andExpect(MockMvcResultMatchers.status().isOk());

    ArgumentCaptor<Long> idArgumentCaptor = ArgumentCaptor.forClass(Long.class);
    ArgumentCaptor<Long> houseIdArgumentCaptor = ArgumentCaptor.forClass(Long.class);
    Mockito.verify(this.residentService).addHouseIfNotExist(idArgumentCaptor.capture(), houseIdArgumentCaptor.capture());
    Assertions.assertEquals(idArgumentCaptor.getValue(), id);
    Assertions.assertEquals(houseIdArgumentCaptor.getValue(), houseId);
  }
}
