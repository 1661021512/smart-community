package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.Community;
import club.yunzhi.smartcommunity.entity.Town;
import club.yunzhi.smartcommunity.service.CommunityService;
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

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * 社区管理测试
 */
public class CommunityControllerTest extends ControllerTest {

  private final static Logger logger = LoggerFactory.getLogger(VillageControllerTest.class);

  @MockBean
  CommunityService communityService;

  private final String baseUrl = "/community";

  public static Community getOneCommunity() {
    Community community = new Community();
    community.setId(new Random().nextLong());
    community.setPinyin(new RandomString().nextString());
    community.setName(new RandomString().nextString());

    Town town = new Town();
    town.setId(new Random().nextLong());
    community.setTown(town);

    return community;
  }

  @Test
  void add() throws Exception {
    // 构造community实体（待保存数据）
    Community community = getOneCommunity();

    String jsonString = JSON.toJSONString(community);

    Mockito.doReturn(community).when(this.communityService).save(Mockito.any(Community.class));

    MockHttpServletRequestBuilder postBuilder = MockMvcRequestBuilders.post(baseUrl)
        .contentType(MediaType.APPLICATION_JSON)
        .content(jsonString);
    mockMvc.perform(postBuilder)
        .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(community.getId()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(community.getName()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.pinyin").value(community.getPinyin()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.town.id").value(community.getTown().getId()))
        .andExpect(MockMvcResultMatchers.status().is(200));
  }

  @Test
  void delete() throws Exception {
    Long id = new Random().nextLong();

    String url = baseUrl + "/" + id.toString();

    mockMvc.perform(MockMvcRequestBuilders.delete(url))
        .andExpect(MockMvcResultMatchers.status().is(200));

    // 断言调用方法符合预期
    ArgumentCaptor<Long> LongArgumentCaptor = ArgumentCaptor.forClass(Long.class);
    Mockito.verify(this.communityService).delete(LongArgumentCaptor.capture());
    Assertions.assertEquals(LongArgumentCaptor.getValue(), id);
  }

  @Test
  void getAll() throws Exception {
    String url = baseUrl + "/getAll";

    Community community = getOneCommunity();

    List<Community> communities = new ArrayList<>();
    communities.add(community);

    Mockito.doReturn(communities).when(this.communityService).findAll();

    this.mockMvc.perform(MockMvcRequestBuilders.get(url))
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value(community.getId()))
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].pinyin").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].town.id").value(community.getTown().getId()))
        .andExpect(MockMvcResultMatchers.status().isOk());
  }

  @Test
  void getAllByTownId() throws Exception {
    Community community = getOneCommunity();
    List<Community> communities = new ArrayList<>();
    communities.add(community);
    Long id = new Random().nextLong();
    Mockito.doReturn(communities).when(this.communityService).getAllByTownId(Mockito.eq(id));

    this.mockMvc.perform(MockMvcRequestBuilders.get(this.baseUrl + "/getByTownId/" + id.toString()))
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value(community.getId()))
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].pinyin").exists())
        .andExpect(MockMvcResultMatchers.status().isOk());
  }

  @Test
  void getById() throws Exception {
    Community community = getOneCommunity();

    Mockito.doReturn(community).when(this.communityService).getById(Mockito.anyLong());

    Long id = community.getId();

    String url = baseUrl + "/" + id.toString();

    this.mockMvc.perform(MockMvcRequestBuilders.get(url)
        .contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8"))
        .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(community.getId()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.name").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.pinyin").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.town.id").value(community.getTown().getId()))
        .andExpect(MockMvcResultMatchers.status().isOk());
  }

  @Test
  void page() throws Exception {
    String url = baseUrl + "/page";

    Integer page = Math.abs(new Random().nextInt());
    Integer size = Math.abs(new Random().nextInt() % 2000);

    List<Community> communities = new ArrayList<>();

    for (int i = 0; i < 20; i++) {
      communities.add(getOneCommunity());
    }

    Page<Community> communityPage = new PageImpl(communities);

    Mockito.doReturn(communityPage).when(this.communityService).page(Mockito.anyString(), Mockito.any(Pageable.class));

    mockMvc.perform(MockMvcRequestBuilders.get(url)
        .queryParam("page", page.toString())
        .queryParam("size", size.toString()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.content.length()").value(20))
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].id").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].name").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].pinyin").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].town.id").exists())
        .andExpect(MockMvcResultMatchers.status().isOk());
  }

  @Test
  void update() throws Exception {
    Long id = new Random().nextLong();
    Community oldCommunity = getOneCommunity();
    oldCommunity.setId(id);
    Community newCommunity = getOneCommunity();
    String jsonString = JSON.toJSONString(oldCommunity, SerializerFeature.DisableCircularReferenceDetect);

    String url = baseUrl + "/" + id.toString();

    Mockito.doReturn(newCommunity).when(this.communityService).update(Mockito.anyLong(), Mockito.any(Community.class));

    MockHttpServletRequestBuilder putRequest = MockMvcRequestBuilders
        .put(url)
        .contentType(MediaType.APPLICATION_JSON)
        .content(jsonString);

    this.mockMvc.perform(putRequest)
        .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(newCommunity.getId()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.name").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.pinyin").exists())
        .andExpect(MockMvcResultMatchers.jsonPath("$.town.id").value(newCommunity.getTown().getId()))
        .andExpect(status().isOk());

    ArgumentCaptor<Community> communityArgumentCaptor = ArgumentCaptor.forClass(Community.class);
    ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
    Mockito.verify(this.communityService).update(longArgumentCaptor.capture(),
        communityArgumentCaptor.capture());
    org.assertj.core.api.Assertions.assertThat(longArgumentCaptor.getValue()).isEqualTo(id);
    org.assertj.core.api.Assertions.assertThat(communityArgumentCaptor.getValue().getName()).isEqualTo(oldCommunity.getName());
    org.assertj.core.api.Assertions.assertThat(communityArgumentCaptor.getValue().getPinyin()).isEqualTo(oldCommunity.getPinyin());
    org.assertj.core.api.Assertions.assertThat(communityArgumentCaptor.getValue().getTown().getId()).isEqualTo(oldCommunity.getTown().getId());
  }

}
