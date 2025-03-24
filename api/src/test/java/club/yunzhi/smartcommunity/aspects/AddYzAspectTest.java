package club.yunzhi.smartcommunity.aspects;

import club.yunzhi.smartcommunity.controller.StudentController;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.SpyBean;


class AddYzAspectTest extends AspectsTest {
  @SpyBean
  StudentController studentController;

  @SpyBean
  AddYzAspect addYzAspect;

  @Test
  void afterReturnName() {
    Mockito.doNothing().when(this.addYzAspect).afterReturnName(null);
    Mockito.doReturn(null).when(this.studentController).getNameById(Mockito.anyLong());
    Mockito.verify(this.addYzAspect, Mockito.times(1)).afterReturnName(null);
  }
}