package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.*;
import club.yunzhi.smartcommunity.service.VillageService;
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

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * 小区管理c层测试
 */
public class VillageControllerTest extends ControllerTest {

  private final static Logger logger = LoggerFactory.getLogger(VillageControllerTest.class);

  private final String baseUrl = "/village";

  @MockBean
  VillageService villageService;

  public static Village getOneVillage() {
    Village village = new Village();

    // 设置village属性
    village.setId(new Random().nextLong());
    village.setName(new RandomString().nextString());
    village.setPinyin(new RandomString().nextString());
    village.setEstablishTime(new Timestamp(System.currentTimeMillis()));
    village.setLatitude(BigDecimal.valueOf(Math.random()));
    village.setLongitude(BigDecimal.valueOf(Math.random()));
    village.setHouseType((short) (new Random().nextInt() % 2));

    logger.debug("构造3d模型");
    Village3dModel village3dModel = new Village3dModel();
    village3dModel.setId(new Random().nextLong());
    village3dModel.setName(new RandomString().nextString());
    village.setModel(village3dModel);

    logger.debug("构造社区");
    Community community = new Community();
    community.setId(new Random().nextLong());
    community.setName(new RandomString().nextString());

    village.setCommunity(community);

    return village;
  }

  @Test
  void add() throws Exception {
    // 构造village实体（待保存数据）
    Village village = getOneVillage();

    String jsonString = JSON.toJSONString(village);

    Mockito.doReturn(village).when(this.villageService).save(Mockito.any(Village.class));

    MockHttpServletRequestBuilder postBuilder = MockMvcRequestBuilders.post(baseUrl)
        .contentType(MediaType.APPLICATION_JSON)
        .content(jsonString);
    mockMvc.perform(postBuilder)
        .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(village.getId()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(village.getName()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.pinyin").value(village.getPinyin()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.establishTime").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.latitude").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.longitude").value(village.getLongitude()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.model.id").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.community.id").exists())
        .andExpect(MockMvcResultMatchers.status().is(200));

    ArgumentCaptor<Village> villageArgumentCaptor = ArgumentCaptor.forClass(Village.class);
    Mockito.verify(this.villageService).save(villageArgumentCaptor.capture());
    Assertions.assertEquals(village.getId(), villageArgumentCaptor.getValue().getId());
  }

  @Test
  void update() throws Exception {
    // 构造village实体（待保存数据）
    Village newVillage = getOneVillage();
    Village oldVillage = getOneVillage();
    Long id = oldVillage.getId();
    String url = baseUrl + "/" + id.toString();

    String jsonString = JSON.toJSONString(newVillage, SerializerFeature.DisableCircularReferenceDetect);

    Mockito.doReturn(newVillage).when(this.villageService).update(Mockito.anyLong(), Mockito.any(Village.class));

    MockHttpServletRequestBuilder postBuilder = MockMvcRequestBuilders.put(url)
        .contentType(MediaType.APPLICATION_JSON)
        .content(jsonString);
    mockMvc.perform(postBuilder)
        .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(newVillage.getId()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(newVillage.getName()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.pinyin").value(newVillage.getPinyin()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.establishTime").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.latitude").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.longitude").value(newVillage.getLongitude()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.model.id").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.community.id").exists())
        .andExpect(MockMvcResultMatchers.status().is(200));

    ArgumentCaptor<Village> villageArgumentCaptor = ArgumentCaptor.forClass(Village.class);
    ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
    Mockito.verify(this.villageService).update(longArgumentCaptor.capture(), villageArgumentCaptor.capture());
    Assertions.assertEquals(newVillage.getId(), villageArgumentCaptor.getValue().getId());
    Assertions.assertEquals(newVillage.getName(), villageArgumentCaptor.getValue().getName());
    Assertions.assertEquals(newVillage.getPinyin(), villageArgumentCaptor.getValue().getPinyin());
    Assertions.assertEquals(newVillage.getLongitude(), villageArgumentCaptor.getValue().getLongitude());
    Assertions.assertEquals(newVillage.getLatitude(), villageArgumentCaptor.getValue().getLatitude());
    Assertions.assertEquals(newVillage.getCommunity().getId(), villageArgumentCaptor.getValue().getCommunity().getId());
    Assertions.assertEquals(newVillage.getModel().getId(), villageArgumentCaptor.getValue().getModel().getId());
  }

  @Test
  void getById() throws Exception {
    Long id = new Random().nextLong();

    String url = baseUrl + "/" + id.toString();

    logger.debug("构造返回的village实体");
    Village village = getOneVillage();

    Mockito.doReturn(village).when(this.villageService).getById(Mockito.anyLong());

    logger.debug("模拟前台发起请求");
    mockMvc.perform(MockMvcRequestBuilders.get(url))
        .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(village.getId()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(village.getName()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.pinyin").value(village.getPinyin()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.establishTime").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.latitude").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.longitude").value(village.getLongitude()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.model.id").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.community.id").exists())
        .andExpect(MockMvcResultMatchers.status().is(200));
  }


  @Test
  void page() throws Exception {
    String url = baseUrl + "/page";

    Integer page = Math.abs(new Random().nextInt());
    Integer size = Math.abs(new Random().nextInt() % 2000);
    Short houseType = (short) (new Random().nextInt() % 2);

    List<Village> villages = new ArrayList<>();

    for (int i = 0; i < 20; i++) {
      villages.add(getOneVillage());
    }

    Page<Village> villagePage = new PageImpl<>(villages);

    Mockito.doReturn(villagePage).when(this.villageService).page(Mockito.anyString(), Mockito.anyShort(), Mockito.any(Pageable.class));

    mockMvc.perform(MockMvcRequestBuilders.get(url)
        .queryParam("houseType", houseType.toString())
        .queryParam("page", page.toString())
        .queryParam("size", size.toString()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.content.length()").value(20))
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].id").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].name").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].pinyin").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].establishTime").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].latitude").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].longitude").exists())
//        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].model.id").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].community.id").exists())
        .andExpect(MockMvcResultMatchers.status().isOk());
  }


  @Test
  void getAll() throws Exception {
    String url = baseUrl + "/getAll";

    Village village = getOneVillage();

    logger.debug("构造一个乡镇");
    Town town = TownControllerTest.getOneTown();

    village.getParent().setParent(town);

    List<Village> villages = new ArrayList<>();
    villages.add(village);

    Mockito.doReturn(villages).when(this.villageService).findAll();

    this.mockMvc.perform(MockMvcRequestBuilders.get(url))
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value(village.getId()))
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].pinyin").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].establishTime").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].latitude").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].longitude").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].model.id").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].community.id").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].community.town.id").exists())
        .andExpect(MockMvcResultMatchers.status().isOk());
  }
}
