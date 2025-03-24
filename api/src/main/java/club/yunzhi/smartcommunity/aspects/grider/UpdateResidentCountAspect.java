package club.yunzhi.smartcommunity.aspects.grider;

import club.yunzhi.smartcommunity.entity.Grider;
import club.yunzhi.smartcommunity.entity.House;
import club.yunzhi.smartcommunity.entity.Resident;
import club.yunzhi.smartcommunity.repository.GriderRepository;
import club.yunzhi.smartcommunity.service.GriderService;
import club.yunzhi.smartcommunity.service.HouseService;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * 更新居民及住房数量
 */
@Component
@Aspect
public class UpdateResidentCountAspect {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  private final GriderService griderService;
  private final HouseService houseService;
  private final GriderRepository griderRepository;

  public UpdateResidentCountAspect(GriderService griderService, HouseService houseService, GriderRepository griderRepository) {
    this.griderService = griderService;
    this.houseService = houseService;
    this.griderRepository = griderRepository;
  }

  /**
   * 移除网格员
   *
   * @param houseId 房屋ID
   */
  @Before(value = "execution(* club.yunzhi.smartcommunity.service.HouseService.removeGrider(..)) && args(houseId)")
  public void beforeRemoveGriderFromHouse(Long houseId) {
    this.update(houseId);
  }

  public void update(Long houseId) {
    Grider grider = this.griderService.getGriderByHouseId(houseId);
    if (grider != null) {
      House house = this.houseService.getById(houseId);
      grider.setHouseCount(grider.getHouseCount() - 1);
      grider.setResidentCount(grider.getResidentCount() - house.getResidents().size());
      this.griderRepository.save(grider);
    } else {
      this.logger.info("移除网格员时未获取到房屋" + houseId + "上的网格员信息");
    }
  }

  /**
   * 批量移除网格员
   *
   * @param houseIds 住房idS
   */
  @Before(value = "execution(* club.yunzhi.smartcommunity.service.HouseService.batchRemoveGrider(..)) && args(houseIds)")
  public void beforeBatchRemoveGriders(List<Long> houseIds) {
    houseIds.forEach(this::update);
  }

  /**
   * 更新房屋的网格员
   *
   * @param houseId  住房
   * @param griderId 网格员ID
   */
  @AfterReturning(value = "execution(* club.yunzhi.smartcommunity.service.HouseService.updateGrider(..)) && args(houseId, griderId)")
  public void afterUpdateGrider(Long houseId, Long griderId) {
    this.griderService.updateHouseAndResidentCount(griderId);
  }

  /**
   * 由住房中移除人员
   * 在住房中添加人员
   */
  @AfterReturning(value = "execution(* club.yunzhi.smartcommunity.service.ResidentService.removeHouse(..)) ||" +
      "execution(* club.yunzhi.smartcommunity.service.ResidentService.addHouseIfNotExist(..))",
      returning = "resident")
  public void afterRemoveOrAddResidentToHouse(Resident resident) {
    resident.getHouses().forEach(house -> this.griderService.updateHouseAndResidentCountByGrider(house.getGrider()));
  }

  @Around("execution(* club.yunzhi.smartcommunity.service.HouseService.delete(..)) && args(houseId))")
  public void aroundDeleteHouse(ProceedingJoinPoint joinPoint, Long houseId) {
    try {
      joinPoint.proceed(new Object[] {houseId});
    } catch (Throwable throwable) {
      String message = "执行aroundDeleteHouse时发生异常：houseId -> " + houseId + "." + throwable.getMessage();
      this.logger.error(message);
      throwable.printStackTrace();
      throw new RuntimeException(message);
    }

    this.update(houseId);
  }
}
