package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.repository.*;
import cn.binarywang.wx.miniapp.api.WxMaService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;

import javax.transaction.Transactional;


@AutoConfigureMockMvc(addFilters = false)
@SpringBootTest
@Transactional
@WithMockUser
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class HouseServiceTest {
  private final static Logger logger = LoggerFactory.getLogger(HouseServiceTest.class);
  @Autowired
  DistrictRepository districtRepository;
  @MockBean
  WxMaService wxMaService;

  @Test
  void page() {
  }
}
