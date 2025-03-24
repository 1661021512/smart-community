package club.yunzhi.smartcommunity.aspects.districtdatastatistics;

import club.yunzhi.smartcommunity.service.DistrictDataStatisticsService;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * 对居民的身份证号码及手机号码进行加密处理
 */
@Aspect
@Component
public class DeleteByDistrictAspect {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  private final DistrictDataStatisticsService districtDataStatisticsService;

  public DeleteByDistrictAspect(DistrictDataStatisticsService districtDataStatisticsService) {
    this.districtDataStatisticsService = districtDataStatisticsService;
  }

  @AfterReturning(value = "execution(* club.yunzhi.smartcommunity.service.DistrictDeleteService.delete(..)) && args(id)")
  public void afterReturnPage(Long id) {
    this.logger.info("执行切面，删除区域的相关方法");
    this.districtDataStatisticsService.deleteAllByDistrictId(id);
  }
}
