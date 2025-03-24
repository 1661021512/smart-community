package club.yunzhi.smartcommunity;

import cn.binarywang.wx.miniapp.api.WxMaService;
import me.chanjar.weixin.common.service.WxService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
class SmartCommunityApplicationTests {
	@MockBean
	WxMaService wxMaService;
	@Test
	void contextLoads() {
	}

}
