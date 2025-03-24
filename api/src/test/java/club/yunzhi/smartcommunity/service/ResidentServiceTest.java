package club.yunzhi.smartcommunity.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author panjie 3792535@qq.com
 * @date 2021/9/25
 * @blog https://segmentfault.com/u/myskies
 * @description
 */
class ResidentServiceTest {

  @Test
  void phoneEncode() {
    Assertions.assertEquals("139****8851", ResidentService.phoneEncode("13920618851"));
  }
}