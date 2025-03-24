package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.User;
import club.yunzhi.smartcommunity.service.UserService;
import cn.binarywang.wx.miniapp.api.WxMaService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestInstance;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import javax.transaction.Transactional;
import java.util.Optional;

@AutoConfigureMockMvc(addFilters = false)
@SpringBootTest
@Transactional
@WithMockUser
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public abstract class ControllerTest {
  protected User currentLoginUser;
  @MockBean
  WxMaService wxMaService;

  @Autowired
  protected MockMvc mockMvc;

  @MockBean
  protected UserService userService;

  @BeforeAll
  public void baseBeforeAll() {
    this.currentLoginUser = Mockito.spy(new User());
  }

  @BeforeEach
  public void baseBeforeEach() {
    Mockito.doReturn(Optional.of(this.currentLoginUser)).when(this.userService).getAuthUserDetailWithoutTransaction();
  }
}