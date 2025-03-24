package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Grider;
import club.yunzhi.smartcommunity.entity.House;
import club.yunzhi.smartcommunity.entity.WebUser;
import club.yunzhi.smartcommunity.repository.GriderRepository;
import com.mengyunzhi.core.exception.ValidationException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;
import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author panjie 3792535@qq.com
 * @date 2022/2/12
 * @blog https://segmentfault.com/u/myskies
 * @description
 */
class GriderServiceImplTest {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  private final GriderServiceImpl griderService;
  private final GriderRepository griderRepository;

  public GriderServiceImplTest() {
    this.griderRepository = Mockito.mock(GriderRepository.class);
    this.griderService = new GriderServiceImpl(this.griderRepository,
        null,
        null,
        null,
        null,
        null, null);
  }

  @Test
  void deleteById() {
    this.logger.debug("准备模拟数据");
    List<House> houses = Mockito.mock(List.class);
    Grider grider = new Grider();
    grider.setWebUser(new WebUser());
    grider.setHouses(houses);
    Long id = new Random().nextLong();
    Mockito.doReturn(Optional.of(grider)).when(this.griderRepository).findById(id);

    this.logger.debug("0个住房时，正常删除");
    Mockito.doReturn(0).when(houses).size();
    this.griderService.deleteById(id);
    Mockito.verify(this.griderRepository, Mockito.times(1)).deleteById(id);

    this.logger.debug("1个住房时，报Validation异常");
    Mockito.doReturn(1).when(houses).size();
    Assertions.assertThrows(ValidationException.class, () -> this.griderService.deleteById(id));
  }
}