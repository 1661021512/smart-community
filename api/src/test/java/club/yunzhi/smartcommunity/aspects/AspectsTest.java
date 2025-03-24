package club.yunzhi.smartcommunity.aspects;

import cn.binarywang.wx.miniapp.api.WxMaService;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@Transactional
public abstract class AspectsTest {
  @MockBean
  protected WxMaService wxMaService;
}
