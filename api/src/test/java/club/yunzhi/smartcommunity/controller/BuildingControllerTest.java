package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.*;
import club.yunzhi.smartcommunity.service.BuildingService;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
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
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * 住房管理c层测试
 */
public class BuildingControllerTest extends ControllerTest {

  private final static Logger logger = LoggerFactory.getLogger(BuildingControllerTest.class);
  private final String baseUrl = "/building";

  @MockBean
  BuildingService buildingService;

  public static Building getOneBuilding() {
    Building building = new Building();
    building.setId(new Random().nextLong());
    Village village = new Village();
    village.setId(new Random().nextLong());
    Community community = new Community();
    community.setId(new Random().nextLong());
    village.setCommunity(community);
    building.setVillage(village);
    building.setMaxFloor(new Random().nextLong());
    building.setVerticalOffset(new Random().nextLong());
    building.setHouseType((short) (new Random().nextInt() % 2));
    building.setUnitCount(new Random().nextLong());
    building.setHorizontalOffset(new Random().nextLong());
    building.setName(new RandomString().nextString());

    return building;
  }

  public static String getOneRightIdNumber() {
    return "131002199910114714";
  }
  public static String getOneRightPhone() {
    return "13343265703";
  }

  @Test
  void save() throws Exception {
    // 构造Building实体（待保存数据）
    Building building = getOneBuilding();

    String jsonString = JSON.toJSONString(building, SerializerFeature.DisableCircularReferenceDetect);

    Mockito.doReturn(building).when(this.buildingService).save(Mockito.any(Building.class));

    MockHttpServletRequestBuilder postBuilder = MockMvcRequestBuilders.post(baseUrl)
        .contentType(MediaType.APPLICATION_JSON)
        .content(jsonString);
    mockMvc.perform(postBuilder)
        .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(building.getId()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(building.getName()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.horizontalOffset").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.maxFloor").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.houseType").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.unitCount").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.verticalOffset").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.village.id").exists())
        .andExpect(MockMvcResultMatchers.status().is(200));

    ArgumentCaptor<Building> buildingArgumentCaptor = ArgumentCaptor.forClass(Building.class);
    Mockito.verify(this.buildingService).save(buildingArgumentCaptor.capture());
    Assertions.assertEquals(building.getHorizontalOffset(), buildingArgumentCaptor.getValue().getHorizontalOffset());
    Assertions.assertEquals(building.getMaxFloor(), buildingArgumentCaptor.getValue().getMaxFloor());
    Assertions.assertEquals(building.getName(), buildingArgumentCaptor.getValue().getName());
    Assertions.assertEquals(building.getUnitCount(), buildingArgumentCaptor.getValue().getUnitCount());
    Assertions.assertEquals(building.getHouseType(), buildingArgumentCaptor.getValue().getHouseType());
    Assertions.assertEquals(building.getVillage().getId(), buildingArgumentCaptor.getValue().getVillage().getId());
  }

  @Test
  void update() throws Exception {
    // 构造Building实体（待保存数据）
    Building newBuilding = getOneBuilding();
    Building oldBuilding = getOneBuilding();
    Long id = oldBuilding.getId();
    String url = baseUrl + "/" + id.toString();

    String jsonString = JSON.toJSONString(newBuilding, SerializerFeature.DisableCircularReferenceDetect);

    Mockito.doReturn(newBuilding).when(this.buildingService).update(Mockito.anyLong(), Mockito.any(Building.class));

    MockHttpServletRequestBuilder postBuilder = MockMvcRequestBuilders.put(url)
        .contentType(MediaType.APPLICATION_JSON)
        .content(jsonString);
    mockMvc.perform(postBuilder)
        .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(newBuilding.getId()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(newBuilding.getName()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.horizontalOffset").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.maxFloor").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.houseType").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.unitCount").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.verticalOffset").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.village.id").exists())
        .andExpect(MockMvcResultMatchers.status().is(200));

    ArgumentCaptor<Building> buildingArgumentCaptor = ArgumentCaptor.forClass(Building.class);
    ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
    Mockito.verify(this.buildingService).update(longArgumentCaptor.capture(), buildingArgumentCaptor.capture());
    Assertions.assertEquals(newBuilding.getHorizontalOffset(), buildingArgumentCaptor.getValue().getHorizontalOffset());
    Assertions.assertEquals(newBuilding.getMaxFloor(), buildingArgumentCaptor.getValue().getMaxFloor());
    Assertions.assertEquals(newBuilding.getName(), buildingArgumentCaptor.getValue().getName());
//    Assertions.assertEquals(newBuilding.getRegion().getId(), buildingArgumentCaptor.getValue().getRegion().getId());
    Assertions.assertEquals(newBuilding.getUnitCount(), buildingArgumentCaptor.getValue().getUnitCount());
    Assertions.assertEquals(newBuilding.getHouseType(), buildingArgumentCaptor.getValue().getHouseType());
    Assertions.assertEquals(newBuilding.getVillage().getId(), buildingArgumentCaptor.getValue().getVillage().getId());
  }

  @Test
  void getById() throws Exception {
    Long id = new Random().nextLong();

    String url = baseUrl + "/" + id.toString();

    logger.debug("构造返回的building实体");
    Building building = getOneBuilding();
    Unit unit = new Unit();
    unit.setId(new Random().nextLong());
    building.getUnits().add(unit);

    Mockito.doReturn(building).when(this.buildingService).getById(Mockito.anyLong());

    logger.debug("模拟前台发起请求");
    mockMvc.perform(MockMvcRequestBuilders.get(url))
        .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(building.getId()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(building.getName()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.horizontalOffset").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.maxFloor").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.houseType").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.unitCount").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.verticalOffset").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.village.id").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.units[0].id").exists())
        .andExpect(MockMvcResultMatchers.status().is(200));
  }

  @Test
  void page() throws Exception {
    String url = baseUrl + "/page";

    Integer page = Math.abs(new Random().nextInt());
    Integer size = Math.abs(new Random().nextInt() % 2000);
    Long villageId = new Random().nextLong();

    List<Building> buildings = new ArrayList<>();

    for (int i = 0; i < 20; i++) {
      buildings.add(getOneBuilding());
    }

    Page<Building> buildingPage = new PageImpl<>(buildings);

    Mockito.doReturn(buildingPage).when(this.buildingService).page(Mockito.anyString(), Mockito.anyLong(), Mockito.anyShort(), Mockito.any(Pageable.class));

    mockMvc.perform(MockMvcRequestBuilders.get(url)
        .queryParam("page", page.toString())
        .queryParam("size", size.toString())
        .queryParam("houseType", "1")
        .queryParam("villageId", villageId.toString()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.content.length()").value(20))
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].id").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].name").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].horizontalOffset").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].maxFloor").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].houseType").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].unitCount").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].verticalOffset").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].village.id").exists())
        .andExpect(MockMvcResultMatchers.status().isOk());
  }

  @Test
  void delete() throws Exception {
    Long id = new Random().nextLong();

    String url = baseUrl + "/" + id.toString();

    mockMvc.perform(MockMvcRequestBuilders.delete(url))
        .andExpect(MockMvcResultMatchers.status().is(200));

    // 断言调用方法符合预期
    ArgumentCaptor<Long> LongArgumentCaptor = ArgumentCaptor.forClass(Long.class);
    Mockito.verify(this.buildingService).delete(LongArgumentCaptor.capture());
    Assertions.assertEquals(LongArgumentCaptor.getValue(), id);
  }

  @Test
  void getAllByVillageId() throws Exception {
    Long villageId = new Random().nextLong();

    String url = baseUrl + "/getByVillageId" + "/" + villageId.toString();

    logger.debug("构造返回的building实体");
    Building building = getOneBuilding();
    List<Building> buildings = new ArrayList<>();

    buildings.add(building);

    Mockito.doReturn(buildings).when(this.buildingService).getAllByVillageId(Mockito.anyLong());

    logger.debug("模拟前台发起请求");
    mockMvc.perform(MockMvcRequestBuilders.get(url))
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").exists())
        .andExpect(MockMvcResultMatchers.status().is(200));
  }

  @Test
  void getByIdWithUnitsAndResidents() throws Exception {
    Long id = new Random().nextLong();
    String url = baseUrl + "/getByIdWithUnitsAndResidents" + "/" + id.toString();

    logger.debug("构造返回的resident实体，模拟的字段和前台需要的字段一致");
    Resident resident = new Resident();
    resident.setId(new Random().nextLong());
    resident.setName(new RandomString().nextString());
    resident.setIdNumber(getOneRightIdNumber());
    resident.setPhone(getOneRightPhone());
    resident.setNationality((short) new Random().nextInt());
    resident.setEducation((short) new Random().nextInt());
    resident.setPoliticalClimate((short) new Random().nextInt());
    resident.setReligion(new RandomString().nextString());
    resident.setWorkPlace(new RandomString().nextString());

    logger.debug("创建实体间的关联");
    House house = new House();
    house.setId(new Random().nextLong());
    house.getResidents().add(resident);
    Unit unit = new Unit();
    unit.setId(new Random().nextLong());
    unit.getHouses().add(house);
    Building building = getOneBuilding();
    building.getUnits().add(unit);
    Mockito.doReturn(building).when(this.buildingService).getById(Mockito.anyLong());

    logger.debug("模拟前台发起请求");
    mockMvc.perform(MockMvcRequestBuilders.get(url))
            // 断言一般字段
            .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(building.getId()))
            .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(building.getName()))
            .andExpect(MockMvcResultMatchers.jsonPath("$.horizontalOffset").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.maxFloor").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.houseType").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.unitCount").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.verticalOffset").exists())
            // 断言关联实体
            .andExpect(MockMvcResultMatchers.jsonPath("$.units[0].id").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.units[0].houses[0]").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.units[0].houses[0].residents[0]").exists())
            // 断言resident字段
            .andExpect(MockMvcResultMatchers.jsonPath("$.units[0].houses[0].residents[0].id").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.units[0].houses[0].residents[0].name").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.units[0].houses[0].residents[0].idNumber").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.units[0].houses[0].residents[0].phone").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.units[0].houses[0].residents[0].nationality").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.units[0].houses[0].residents[0].education").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.units[0].houses[0].residents[0].politicalClimate").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.units[0].houses[0].residents[0].religion").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.units[0].houses[0].residents[0].workPlace").exists())
            // http
            .andExpect(MockMvcResultMatchers.status().is(200));
  }
}
