package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.Community;
import club.yunzhi.smartcommunity.entity.Town;
import club.yunzhi.smartcommunity.entity.Village;
import club.yunzhi.smartcommunity.service.TownService;
import net.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import com.alibaba.fastjson.JSON;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class TownControllerTest extends ControllerTest {
  private final static Logger logger = LoggerFactory.getLogger(VillageControllerTest.class);
  private final String baseUrl = "/town";

  @MockBean
  TownService townService;

  @Test
  void getAll() throws Exception {
    String url = baseUrl;

    Town town = getOneTown();

    List<Town> towns = new ArrayList<>();
    towns.add(town);

    Mockito.doReturn(towns).when(this.townService).findAll();

    this.mockMvc.perform(MockMvcRequestBuilders.get(url))
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value(town.getId()))
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].pinyin").exists())
        .andExpect(MockMvcResultMatchers.status().isOk());
  }

  public static Town getOneTown() {
    Town town = new Town();

    // 设置town属性
    town.setId(new Random().nextLong());
    town.setName(new RandomString().nextString());
    town.setPinyin(new RandomString().nextString());
    town.setCreateTime(new Timestamp(System.currentTimeMillis()));

    logger.debug("构造一个社区");
    Community community = new Community();
    community.setId(new Random().nextLong());
    community.setName(new RandomString().nextString());

    logger.debug("构造一个区域");
    Village village = new Village();
    village.setId(new Random().nextLong());
    village.setName(new RandomString().nextString());
    village.setPinyin(new RandomString().nextString());
    community.getVillages().add(village);

    town.getCommunities().add(community);
    return town;
  }

  @Test
  void add() throws Exception {
    // 构造town实体（待保存数据）
    Town town = getOneTown();

    String jsonString = JSON.toJSONString(town);

    Mockito.doReturn(town).when(this.townService).save(Mockito.any(Town.class));

    MockHttpServletRequestBuilder postBuilder = MockMvcRequestBuilders.post(baseUrl)
        .contentType(MediaType.APPLICATION_JSON)
        .content(jsonString);
    mockMvc.perform(postBuilder)
        .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(town.getId()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(town.getName()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.pinyin").value(town.getPinyin()))
        .andExpect(MockMvcResultMatchers.status().is(200));

    ArgumentCaptor<Town> townArgumentCaptor = ArgumentCaptor.forClass(Town.class);
    Mockito.verify(this.townService).save(townArgumentCaptor.capture());
    Assertions.assertEquals(town.getId(), townArgumentCaptor.getValue().getId());
  }

  @Test
  void delete() throws Exception {
    Long id = new Random().nextLong();

    String url = baseUrl + "/" + id.toString();

    mockMvc.perform(MockMvcRequestBuilders.delete(url))
        .andExpect(MockMvcResultMatchers.status().is(200));

    // 断言调用方法符合预期
    ArgumentCaptor<Long> IntegerArgumentCaptor = ArgumentCaptor.forClass(Long.class);
    Mockito.verify(this.townService).delete(IntegerArgumentCaptor.capture());
    Assertions.assertEquals(IntegerArgumentCaptor.getValue(), id);
  }

  @Test
  void getById() throws Exception {
    Town town = getOneTown();

    Mockito.doReturn(town).when(this.townService).getById(Mockito.anyLong());

    Integer id = town.getId().intValue();

    String url = baseUrl + "/" + id.toString();

    this.mockMvc.perform(MockMvcRequestBuilders.get(url)
        .contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8"))
        .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(town.getId()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.name").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.pinyin").exists())
        .andExpect(MockMvcResultMatchers.status().isOk());
  }


  @Test
  void page() throws Exception {
    String url = baseUrl + "/page";

    Integer page = Math.abs(new Random().nextInt());
    Integer size = Math.abs(new Random().nextInt() % 2000);

    List<Town> towns = new ArrayList<>();

    for (int i = 0; i < 20; i++) {
      towns.add(getOneTown());
    }

    Page<Town> townPage = new PageImpl<Town>(towns);

    Mockito.doReturn(townPage).when(this.townService).page(Mockito.anyString(), Mockito.any(Pageable.class));

    mockMvc.perform(MockMvcRequestBuilders.get(url)
        .queryParam("page", page.toString())
        .queryParam("size", size.toString()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.content.length()").value(20))
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].id").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].name").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].pinyin").exists())
        .andExpect(MockMvcResultMatchers.status().isOk());
  }

  @Test
  void update() throws Exception {
    Long id = new Random().nextLong();
    Town oldTown = getOneTown();
    oldTown.setId(id);
    Town newTown = getOneTown();
    String jsonString = JSON.toJSONString(oldTown);

    String url = baseUrl + "/" + id.toString();

    Mockito.doReturn(newTown).when(this.townService).update(Mockito.anyLong(), Mockito.any(Town.class));

    MockHttpServletRequestBuilder putRequest = MockMvcRequestBuilders
        .put(url)
        .contentType(MediaType.APPLICATION_JSON)
        .content(jsonString);

    this.mockMvc.perform(putRequest)
        .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(newTown.getId()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.name").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.pinyin").exists())
        .andExpect(status().isOk());

    ArgumentCaptor<Town> townArgumentCaptor = ArgumentCaptor.forClass(Town.class);
    ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
    Mockito.verify(this.townService).update(longArgumentCaptor.capture(),
        townArgumentCaptor.capture());
    org.assertj.core.api.Assertions.assertThat(longArgumentCaptor.getValue()).isEqualTo(id);
    org.assertj.core.api.Assertions.assertThat(townArgumentCaptor.getValue().getName()).isEqualTo(oldTown.getName());
  }
}