package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.controller.VillageControllerTest;
import club.yunzhi.smartcommunity.entity.Village;
import club.yunzhi.smartcommunity.repository.DistrictRepository;
import club.yunzhi.smartcommunity.repository.VillageRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.platform.commons.util.StringUtils;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

public class VillageServiceTest {

  private final static Logger logger = LoggerFactory.getLogger(VillageServiceTest.class);

  private VillageRepository villageRepository;
  private VillageServiceImpl villageService;
  private DistrictRepository districtRepository;
  private DistrictService districtService;
  private BuildingService buildingService;

  private VillageServiceTest() {
    this.villageRepository = Mockito.mock(VillageRepository.class);
    this.districtRepository = Mockito.mock(DistrictRepository.class);
    this.districtService = Mockito.mock(DistrictService.class);
    this.buildingService = Mockito.mock(BuildingService.class);
    this.villageService = new VillageServiceImpl(
        villageRepository, districtRepository, districtService, buildingService);
  }

  @Test
  void add() {
    // 准备数据
    Village village = VillageControllerTest.getOneVillage();

    ArgumentCaptor<Village> villageArgumentCaptor = ArgumentCaptor.forClass(Village.class);

    Mockito.doReturn(village).when(this.villageRepository).save(Mockito.any(Village.class));

    this.villageService.save(village);

    Mockito.verify(this.villageRepository, Mockito.times(1))
        .save(villageArgumentCaptor.capture());
    Village village1 = villageArgumentCaptor.getValue();
    Assertions.assertThat(village1.getName()).isEqualTo(village.getName());
    Assertions.assertThat(village1.getPinyin()).isEqualTo(village.getPinyin());
    Assertions.assertThat(village1.getLatitude()).isEqualTo(village.getLatitude());
    Assertions.assertThat(village1.getLongitude()).isEqualTo(village.getLongitude());
    Assertions.assertThat(village1.getCommunity()).isEqualTo(village.getCommunity());
//    Assertions.assertThat(village1.getModel()).isEqualTo(village.getModel());
  }

  private static final String dateFormat = "yyyy-MM-dd HH:mm:ss";
  private static final String shortDateFormat = "yyyy-MM-dd";
  private static final String dateFormat2 = "yyyy/MM/dd HH:mm:ss";
  private static final String shortDateFormat2 = "yyyy/MM/dd";

  public static Date convert(String source) {
    source = source.trim();
    try {
      SimpleDateFormat formatter;
      formatter = new SimpleDateFormat(shortDateFormat);
      Date dtDate = formatter.parse(source);
      return dtDate;
    } catch (Exception e) {
      throw new RuntimeException(String.format("parser %s to Date fail", source));
    }
  }

  @Test
  void test() {
    String idNumber = "220221197705044923";
    String sex = idNumber.substring(16, 17);
    String year = idNumber.substring(6, 10);
    String month = idNumber.substring(10, 12);
    String day = idNumber.substring(12, 14);
    String date2 = year + "-" + month + "-" +day;
    String date3 = idNumber.substring(6, 14);
    java.sql.Date date111 = new java.sql.Date(new Integer(year) - 1900, new Integer(month) - 1, new Integer(day));
//    Long date1 =
    Long date = convert(date2).getTime();
    String datex = convert(date2).toString();
    Timestamp time = new Timestamp(date);
    Timestamp time1 = new Timestamp(new Date(System.currentTimeMillis()).getTime());
    String times = time.toString().substring(0, 11);
    Long small = new Long("2001");
    String smallString = small.toString();
    if (time1.getTime() > time.getTime() ) {
      logger.debug("成功");
    }
  }
}
