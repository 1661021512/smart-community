package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.Role;
import club.yunzhi.smartcommunity.service.RoleService;
import com.alibaba.fastjson.JSON;
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
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Random;

public class RoleControllerTest extends ControllerTest {
  private final static Logger logger = LoggerFactory.getLogger(VillageControllerTest.class);
  private final String baseUrl = "/role";

  @MockBean
  RoleService roleService;

  public static Role getOneRole() {
    Role role = new Role();
    role.setId(new Random().nextLong());
    role.setName(new RandomString().nextString());
    role.setValue(new RandomString().nextString());
    role.setWeight(new Random().nextInt());
    role.setSystemed(false);

    return role;
  }

  @Test
  void add() throws Exception {
    Role role = getOneRole();
    String jsonString = JSON.toJSONString(role);

    Mockito.doReturn(role).when(this.roleService).add(Mockito.any(Role.class));

    MockHttpServletRequestBuilder postBuilder = MockMvcRequestBuilders.post(baseUrl)
        .contentType(MediaType.APPLICATION_JSON)
        .content(jsonString);

    mockMvc.perform(postBuilder)
        .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(role.getId()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(role.getName()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.value").value(role.getValue()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.weight").value(role.getWeight()))
        .andExpect(MockMvcResultMatchers.status().is(200));

    ArgumentCaptor<Role> roleArgumentCaptor = ArgumentCaptor.forClass(Role.class);
    Mockito.verify(this.roleService).add(roleArgumentCaptor.capture());
    Assertions.assertEquals(role.getId(), roleArgumentCaptor.getValue().getId());
  }

  @Test
  void update() throws Exception {
    Role newRole = getOneRole();
    Role oldRole = getOneRole();
    Long id = new Random().nextLong();
    String jsonString = JSON.toJSONString(oldRole);

    String url = baseUrl + "/" + id.toString();

    Mockito.doReturn(newRole).when(this.roleService).update(Mockito.anyLong() ,Mockito.any(Role.class));

    MockHttpServletRequestBuilder putBuilder = MockMvcRequestBuilders.put(url)
        .contentType(MediaType.APPLICATION_JSON)
        .content(jsonString);

    mockMvc.perform(putBuilder)
        .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(newRole.getId()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(newRole.getName()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.value").value(newRole.getValue()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.weight").value(newRole.getWeight()))
        .andExpect(MockMvcResultMatchers.status().is(200));

    ArgumentCaptor<Role> roleArgumentCaptor = ArgumentCaptor.forClass(Role.class);
    ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
    Mockito.verify(this.roleService).update(longArgumentCaptor.capture(), roleArgumentCaptor.capture());
    Assertions.assertEquals(oldRole.getId(), roleArgumentCaptor.getValue().getId());
    Assertions.assertEquals(id, longArgumentCaptor.getValue());
  }
}
