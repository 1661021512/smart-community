package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.Community3d;
import club.yunzhi.smartcommunity.service.Community3dService;
import net.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;

class Community3dControllerTest extends ControllerTest {
  private String url = "/community3d";
  @MockBean
  Community3dService community3dService;

  static Community3d getOneCommunity3d() {
    Community3d community3d = new Community3d();
    community3d.setId(new Random().nextLong());
    community3d.setName(RandomString.make());
    return community3d;
  }

  @Test
  void getAll() throws Exception {
    List<Community3d> community3ds = new ArrayList<>();
    for (int i = 0; i < 10; i++) {
      community3ds.add(Community3dControllerTest.getOneCommunity3d());
    }

    Mockito.doReturn(community3ds).when(this.community3dService).getAll();

    this.mockMvc.perform(MockMvcRequestBuilders.get(this.url)
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.jsonPath(".length()").value(10))
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").isNumber())
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").isString())
        .andExpect(MockMvcResultMatchers.status().isOk());
  }
}