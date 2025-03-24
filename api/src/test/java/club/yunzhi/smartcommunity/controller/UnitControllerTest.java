package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.Building;
import club.yunzhi.smartcommunity.entity.Unit;
import club.yunzhi.smartcommunity.service.UnitService;
import com.alibaba.fastjson.JSON;
import net.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Random;

public class UnitControllerTest extends ControllerTest {
  private final static Logger logger = LoggerFactory.getLogger(VillageControllerTest.class);
  private final String baseUrl = "/unit";

  @MockBean
  UnitService unitService;

  public static Unit getOneUnit() {
    Unit unit = new Unit();
    unit.setId(new Random().nextLong());
    Building building = BuildingControllerTest.getOneBuilding();
    unit.setBuilding(building);
    unit.setName(new RandomString().nextString());
    unit.setWeight(new Random().nextLong());

    return unit;
  }

  @Test
  void save() throws Exception {
    Unit unit = getOneUnit();

    Mockito.doReturn(unit).when(this.unitService).save(Mockito.any(Unit.class));

    this.mockMvc.perform(MockMvcRequestBuilders
        .post(this.baseUrl)
        .contentType(MediaType.APPLICATION_JSON)
        .content(JSON.toJSONString(unit)))
        .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(unit.getName()))
        .andExpect(MockMvcResultMatchers.status().isOk());
  }
}
