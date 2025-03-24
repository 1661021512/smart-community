package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.House;
import club.yunzhi.smartcommunity.entity.Unit;
import club.yunzhi.smartcommunity.input.UpdateOwner;
import club.yunzhi.smartcommunity.service.HouseService;
import com.alibaba.fastjson.JSON;
import net.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

public class HouseControllerTest extends ControllerTest {
  private final static Logger logger = LoggerFactory.getLogger(HouseControllerTest.class);
  private final String baseUrl = "/house";

  @MockBean
  HouseService houseService;

  public static House getOneHouse() {
    House house = new House();
    house.setId(new Random().nextLong());
    house.setName(new RandomString().nextString());
    house.setType((short) (new Random().nextInt() % 2));
    house.setRemarks(new RandomString().nextString());
    house.setArea(new Random().nextLong());
    house.setCheckInTime(new Timestamp(new Date().getTime()));
    house.setFloor(new Random().nextLong());
    house.setLowIncoming(new Random().nextBoolean());
    house.setRelief(new Random().nextBoolean());
    house.setWeight(new Random().nextLong());

    logger.debug("设置house的unit属性");
    Unit unit = UnitControllerTest.getOneUnit();
    house.setUnit(unit);

    return house;
  }

  @Test
  void page() throws Exception {
    String url = baseUrl + "/page";

    Integer page = Math.abs(new Random().nextInt());
    Integer size = Math.abs(new Random().nextInt() % 2000);
    Short type = (short) (new Random().nextInt() % 2);
    Long villageId = new Random().nextLong();
    Long buildingId = new Random().nextLong();
    Long unitId = new Random().nextLong();
    Long griderId = new Random().nextLong();
    Long excludedGriderId = new Random().nextLong();
    List<House> houses = new ArrayList<>();
    String ownerName = new RandomString().nextString();

    for (int i = 0; i < 20; i++) {
      houses.add(getOneHouse());
    }

    Page<House> housePage = new PageImpl<>(houses);

    Mockito.doReturn(housePage).when(this.houseService)
        .page(Mockito.anyShort(),
            Mockito.anyLong(),
            Mockito.anyLong(),
            Mockito.anyLong(),
            Mockito.anyString(),
            Mockito.anyLong(),
            Mockito.anyLong(),
            Mockito.anyBoolean(),
            Mockito.any(Pageable.class));

    mockMvc.perform(MockMvcRequestBuilders.get(url)
        .queryParam("owner", ownerName)
        .queryParam("houseType", type.toString())
        .queryParam("villageId", villageId.toString())
        .queryParam("buildingId", buildingId.toString())
        .queryParam("unitId", unitId.toString())
        .queryParam("griderId", griderId.toString())
        .queryParam("excludedGriderId", excludedGriderId.toString())
        .queryParam("isExcludedGriderIsNotNull", "true")
        .queryParam("page", page.toString())
        .queryParam("size", size.toString()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.content.length()").value(20))
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].id").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].name").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].weight").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].checkInTime").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].type").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].unit.id").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].unit.building.id").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].unit.building.village.id").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].unit.building.village.community.id").exists())
        .andExpect(MockMvcResultMatchers.status().isOk());
  }

  @Test
  void getAllByBuildingId() throws Exception {
    List<House> houses = new ArrayList<>();

    for (int i = 0; i < 20; i++) {
      houses.add(getOneHouse());
    }

    Mockito.doReturn(houses).when(this.houseService).getAllByBuildingId(Mockito.anyLong());

    Long id = new Random().nextLong();

    String url = baseUrl + "/getAllByBuildingId/" + id.toString();

    this.mockMvc.perform(MockMvcRequestBuilders.get(url)
        .contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8"))
        .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(20))
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].unit.id").exists())
        .andExpect(MockMvcResultMatchers.status().isOk());
  }

  @Test
  void update() throws Exception {
    // 构造house实体（待保存数据）
    House newHouse = getOneHouse();
    House oldHouse = getOneHouse();
    Long id = oldHouse.getId();
    String url = baseUrl + "/" + id.toString();

    String jsonString = JSON.toJSONString(newHouse);

    Mockito.doReturn(newHouse).when(this.houseService).update(Mockito.anyLong(), Mockito.any(House.class));

    MockHttpServletRequestBuilder postBuilder = MockMvcRequestBuilders.put(url)
        .contentType(MediaType.APPLICATION_JSON)
        .content(jsonString);
    mockMvc.perform(postBuilder)
        .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(newHouse.getId()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.type").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.area").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.lowIncoming").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.relief").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.checkInTime").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.remarks").exists())
        .andExpect(MockMvcResultMatchers.status().is(200));

    ArgumentCaptor<House> houseArgumentCaptor = ArgumentCaptor.forClass(House.class);
    ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
    Mockito.verify(this.houseService).update(longArgumentCaptor.capture(), houseArgumentCaptor.capture());
    Assertions.assertEquals(newHouse.getId(), houseArgumentCaptor.getValue().getId());
    Assertions.assertEquals(newHouse.getType(), houseArgumentCaptor.getValue().getType());
    Assertions.assertEquals(newHouse.getArea(), houseArgumentCaptor.getValue().getArea());
    Assertions.assertEquals(newHouse.getLowIncoming(), houseArgumentCaptor.getValue().getLowIncoming());
    Assertions.assertEquals(newHouse.getRelief(), houseArgumentCaptor.getValue().getRelief());
    Assertions.assertEquals(newHouse.getCheckInTime(), houseArgumentCaptor.getValue().getCheckInTime());
    Assertions.assertEquals(newHouse.getRemarks(), houseArgumentCaptor.getValue().getRemarks());
  }

  @Test
  void saveAll() throws Exception {
    List<House> houses = new ArrayList<>();
    for (int i = 0; i < 10; i++) {
      House house = new House();
      house.setName(RandomString.make());
      house.setWeight(new Random().nextLong());
      house.setFloor(new Random().nextLong());
      Unit unit = new Unit();
      unit.setId(new Random().nextLong());
      house.setUnit(unit);
      houses.add(house);
    }

    Mockito.doReturn(houses).when(this.houseService).saveAll(Mockito.any(List.class));

    this.mockMvc.perform(MockMvcRequestBuilders.post(this.baseUrl + "/saveAll")
        .contentType(MediaType.APPLICATION_JSON)
        .content(JSON.toJSONString(houses)))
        .andExpect(MockMvcResultMatchers.status().is(HttpStatus.CREATED.value()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(10));

  }

  @Test
  void updateHouseName() throws Exception {
    // 构造house实体（待保存数据）
    House house = getOneHouse();
    Long id = house.getId();
    String newName = house.getName();
    String url = baseUrl + "/updateName/" + id.toString();

    String jsonString = JSON.toJSONString(house);

    Mockito.doReturn(house).when(this.houseService).updateHouseName(Mockito.anyLong(), Mockito.any(House.class));

    MockHttpServletRequestBuilder postBuilder = MockMvcRequestBuilders.put(url)
        .contentType(MediaType.APPLICATION_JSON)
        .content(jsonString);
    mockMvc.perform(postBuilder)
        .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(house.getId()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.name").exists())
        .andExpect(MockMvcResultMatchers.status().is(200));

    ArgumentCaptor<House> houseArgumentCaptor = ArgumentCaptor.forClass(House.class);
    ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
    Mockito.verify(this.houseService).updateHouseName(longArgumentCaptor.capture(), houseArgumentCaptor.capture());
    org.assertj.core.api.Assertions.assertThat(houseArgumentCaptor.getValue().getName()).isEqualTo(newName);
  }

  @Test
  void updateOwner() throws Exception {
    // 构造house实体（待保存数据）
    House house = getOneHouse();
    Long id = house.getId();

    logger.debug("构造请求数据");
    Long residentId = new Random().nextLong();
    Boolean isOwner = new Random().nextBoolean();
    UpdateOwner updateOwner = new UpdateOwner();
    updateOwner.setIsOwner(isOwner);
    updateOwner.setResidentId(residentId);

    String url = baseUrl + "/updateOwner/" + id.toString();

    String jsonString = JSON.toJSONString(updateOwner);

    Mockito.doReturn(house).when(this.houseService).updateOwner(Mockito.anyLong(), Mockito.any(UpdateOwner.class));

    MockHttpServletRequestBuilder postBuilder = MockMvcRequestBuilders.patch(url)
        .contentType(MediaType.APPLICATION_JSON)
        .content(jsonString);
    mockMvc.perform(postBuilder)
        .andExpect(MockMvcResultMatchers.status().is(200));
  }

  @Test
  void getById() {
    // todo:
  }
}
