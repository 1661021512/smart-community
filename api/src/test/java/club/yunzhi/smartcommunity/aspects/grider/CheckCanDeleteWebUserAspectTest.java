package club.yunzhi.smartcommunity.aspects.grider;

import club.yunzhi.smartcommunity.aspects.AspectTestException;
import club.yunzhi.smartcommunity.aspects.AspectsTest;
import club.yunzhi.smartcommunity.service.WebUserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.SpyBean;

import java.util.Random;

/**
 * @author panjie 3792535@qq.com
 * @date 2022/2/12
 * @blog https://segmentfault.com/a/1190000041048368
 * <p>
 *   使用@SpyBean产生的Bean，如果同步注入其对应的@Before切面。
 *   比如在此使用@SpyBean注入 CheckCanDeleteWebUserAspect及WebUserService
 *   则此时WebUserService将不被看作Mock对象，在其上使用Mockito.xxx.when()将报异常。
 * </p>
 * <p>
 *   测试@Before步骤如下：
 *   1. 正常注入被切的方法
 *   2. 使用@SpyBean注入相应的切面
 *   3. Mock掉切入方法，并模拟返回异常。
 *   4. 调用被切方法，断言发生异常
 * </p>
 */
class CheckCanDeleteWebUserAspectTest extends AspectsTest {
  @SpyBean
  CheckCanDeleteWebUserAspect checkCanDeleteWebUserAspect;

  @Autowired
  WebUserService webUserService;

  @Test
  public void beforeDeleteWebUser() {
    Long webUserLong = new Random().nextLong();
    Mockito.doThrow(AspectTestException.class).when(checkCanDeleteWebUserAspect).beforeDeleteWebUser(webUserLong);
    Assertions.assertThrows(AspectTestException.class, () -> webUserService.delete(webUserLong));
  }
}