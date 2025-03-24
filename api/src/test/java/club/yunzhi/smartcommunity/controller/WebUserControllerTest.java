package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.service.WebUserService;
import net.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


/**
 * 用户测试
 */
class WebUserControllerTest extends ControllerTest {
  private String url = "/webUser";
  @MockBean
  WebUserService webUserService;
  @Test
  void existByUsername() throws Exception {
    String username = RandomString.make(11);
    Mockito.doReturn(true).when(this.webUserService).existByUsername(Mockito.eq(username));
    this.mockMvc.perform(MockMvcRequestBuilders.get(this.url + "/existByUsername")
        .queryParam("username", username))
        .andExpect(MockMvcResultMatchers.content().string("true"))
        .andExpect(MockMvcResultMatchers.status().isOk());
  }
}