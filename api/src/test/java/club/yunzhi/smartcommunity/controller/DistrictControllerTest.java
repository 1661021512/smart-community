package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.County;
import club.yunzhi.smartcommunity.entity.Town;
import club.yunzhi.smartcommunity.service.DistrictService;
import net.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Random;

public class DistrictControllerTest extends ControllerTest {

  private final static Logger logger = LoggerFactory.getLogger(VillageControllerTest.class);

  private final String baseUrl = "/district";

  @MockBean
  DistrictService districtService;

  public static County getOneCounty() {
    County county = new County();
    county.setId(new Random().nextLong());
    county.setName(new RandomString().nextString());
    logger.debug("获取乡镇");
    Town town = TownControllerTest.getOneTown();
    county.getTowns().add(town);
    return county;
  }


  @Test
  void getCounty() throws Exception {
    String url = baseUrl + "/county";

    County county = getOneCounty();

    Mockito.doReturn(county).when(this.districtService).getCounty();

    this.mockMvc.perform(MockMvcRequestBuilders.get(url))
        .andDo(MockMvcResultHandlers.print())
        .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(county.getId()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(county.getName()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.towns[0].id").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.towns[0].communities[0].id").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.towns[0].communities[0].villages[0].id").exists())
        .andExpect(MockMvcResultMatchers.status().isOk());
  }

}
