package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.controller.ResidentControllerTest;
import club.yunzhi.smartcommunity.entity.Resident;
import club.yunzhi.smartcommunity.repository.DistrictRepository;
import net.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ResidentServiceImplTest {
  private static final Logger logger = LoggerFactory.getLogger(ResidentServiceImplTest.class);

  private final ResidentServiceImpl residentService;
  private final GriderService griderService;
  private final DistrictRepository districtRepository;

  public ResidentServiceImplTest() {
    griderService = Mockito.mock(GriderService.class);
    districtRepository = Mockito.mock(DistrictRepository.class);
    this.residentService = new ResidentServiceImpl(null,
        null,
        null,
        null, null, null,null, griderService, districtRepository, null);
  }

  @Test
  void randomChar() {
    char[] token = new RandomString(100).nextString().toCharArray();
    Assertions.assertEquals(token.length, 100);
  }

  @Test
  void idNumberEncode() {
    Resident resident = ResidentControllerTest.getOneResident();

    String newIdNumber = ResidentService.idNumberEncode(resident.getIdNumber());
  }

  @Test
  void phoneEncode() {
    Resident resident = ResidentControllerTest.getOneResident();
    String newPhone = ResidentService.phoneEncode(resident.getPhone());
  }

  @Test
  void clear() {
    this.residentService.clearYesterdayExcelFile();
  }
}
