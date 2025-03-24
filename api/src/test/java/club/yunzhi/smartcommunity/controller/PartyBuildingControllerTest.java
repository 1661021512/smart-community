package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.District;
import club.yunzhi.smartcommunity.entity.Duty;
import club.yunzhi.smartcommunity.entity.PartyBuilding;
import club.yunzhi.smartcommunity.entity.User;
import club.yunzhi.smartcommunity.service.PartyBuildingService;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import net.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Random;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class PartyBuildingControllerTest extends ControllerTest {
  private final static Logger logger = LoggerFactory.getLogger(PartyBuildingControllerTest.class);
  private final String baseUrl = "/partyBuilding";

  @MockBean
  PartyBuildingService partyBuildingService;

  public PartyBuilding getOnePartBuilding() {
    PartyBuilding partyBuilding = new PartyBuilding();

    User user = new User();
    user.setId(new Random().nextLong());
    partyBuilding.setPersonName(RandomString.make());

    Duty duty = new Duty();
    duty.setName(new RandomString().nextString());
    duty.setId(new Random().nextLong());
    partyBuilding.setDuty(duty);

    District district = new District();
    district.setId(new Random().nextLong());
    district.setName(new RandomString().nextString());
    partyBuilding.setDistrict(district);

    return partyBuilding;
  }

  @Test
  void getByDutyIdAndDistrictId() throws Exception {
    Integer dutyId = new Random().nextInt(10);
    Integer districtId = new Random().nextInt(10);

    PartyBuilding partyBuilding = getOnePartBuilding();

    Mockito.doReturn(partyBuilding)
        .when(this.partyBuildingService)
        .getByDutyIdAndDistrictId(Mockito.anyLong(), Mockito.anyLong());

    String url = this.baseUrl + "/getByDutyIdAndDistrictId/" + dutyId.toString() + "/" + districtId.toString();

    this.mockMvc.perform(MockMvcRequestBuilders.get(url)
        .contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8"))
        .andExpect(MockMvcResultMatchers.status().isOk());
  }

  @Test
  void update() throws Exception {
    Long dutyId = new Random().nextLong();
    Long districtId = new Random().nextLong();

    PartyBuilding newPartyBuilding = getOnePartBuilding();
    PartyBuilding oldPartyBuilding = getOnePartBuilding();

    String jsonString = JSON.toJSONString(newPartyBuilding,
        SerializerFeature.DisableCircularReferenceDetect);
    String url = this.baseUrl + "/" + dutyId.toString() + "," + districtId.toString();

    Mockito.doReturn(oldPartyBuilding).when(this.partyBuildingService)
        .update(Mockito.anyLong(), Mockito.anyLong(), Mockito.any(PartyBuilding.class));

    MockHttpServletRequestBuilder putRequest = MockMvcRequestBuilders
        .put(url)
        .contentType(MediaType.APPLICATION_JSON)
        .content(jsonString);

    this.mockMvc.perform(putRequest)
        .andExpect(status().isOk());

    ArgumentCaptor<PartyBuilding> partBuildingArgumentCaptor = ArgumentCaptor.forClass(PartyBuilding.class);
    ArgumentCaptor<Long> dutyIdArgumentCaptor = ArgumentCaptor.forClass(Long.class);
    ArgumentCaptor<Long> districtIdArgumentCaptor = ArgumentCaptor.forClass(Long.class);
    Mockito.verify(this.partyBuildingService).update(
        dutyIdArgumentCaptor.capture(),
        districtIdArgumentCaptor.capture(),
        partBuildingArgumentCaptor.capture());
    org.assertj.core.api.Assertions
        .assertThat(dutyIdArgumentCaptor.getValue()).isEqualTo(dutyId);
    org.assertj.core.api.Assertions
        .assertThat(districtIdArgumentCaptor.getValue()).isEqualTo(districtId);
    org.assertj.core.api.Assertions.assertThat(
        partBuildingArgumentCaptor.getValue().getPersonName()
            .equals(newPartyBuilding.getPersonName()));
  }
}
