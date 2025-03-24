package club.yunzhi.smartcommunity.aspects.grider;

import club.yunzhi.smartcommunity.aspects.AspectTestException;
import club.yunzhi.smartcommunity.aspects.AspectsTest;
import club.yunzhi.smartcommunity.service.HouseService;
import org.aspectj.lang.ProceedingJoinPoint;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.SpyBean;

import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author panjie 3792535@qq.com
 * @date 2022/2/14
 * @blog https://segmentfault.com/u/myskies
 * @description
 */
class UpdateResidentCountAspectTest extends AspectsTest {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  @SpyBean
  UpdateResidentCountAspect updateResidentCountAspect;

  @Autowired
  HouseService houseService;

  /**
   * 注入参数捕获器
   * https://www.baeldung.com/mockito-argumentcaptor
   * */
  @Captor
  ArgumentCaptor<Object[]> argumentCaptor;

  @Test
  void aroundDeleteHouse() {
    Mockito.doThrow(AspectTestException.class).when(this.updateResidentCountAspect)
        .aroundDeleteHouse(Mockito.any(), Mockito.anyLong());
    Assertions.assertThrows(AspectTestException.class, () -> this.houseService.delete(123L));
  }

  @Test
  void aroundDeleteHouseJoinPoint() throws Throwable {
    this.logger.info("准备测试对象");
    ProceedingJoinPoint proceedingJoinPoint = Mockito.mock(ProceedingJoinPoint.class);
    Mockito.doNothing().when(this.updateResidentCountAspect).update(Mockito.anyLong());
    Long houseId = new Random().nextLong();

    this.logger.info("调用切面方法");
    updateResidentCountAspect.aroundDeleteHouse(proceedingJoinPoint, houseId);

    this.logger.info("断言切面被成功调用");
    Mockito.verify(proceedingJoinPoint, Mockito.times(1)).proceed(this.argumentCaptor.capture());
    Mockito.verify(updateResidentCountAspect).update(houseId);

    this.logger.info("断言调用被切方法时参数正确");
    Assertions.assertEquals(houseId, this.argumentCaptor.getValue()[0]);
  }
}