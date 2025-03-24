package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.dto.DistrictHouseAndResidentCountDto;
import club.yunzhi.smartcommunity.entity.Statistics;
import club.yunzhi.smartcommunity.entity.User;
import club.yunzhi.smartcommunity.service.StatisticsService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 数据统计
 */
@RequestMapping("statistics")
@RestController
public class StatisticsController {
  private final StatisticsService statisticsService;

  public StatisticsController(StatisticsService statisticsService) {
    this.statisticsService = statisticsService;
  }

  @GetMapping("getSonDistrictHouseAndResidentCountOfCurrentUser")
  @JsonView(GetSonDistrictHouseAndResidentCountOfCurrentUserJsonView.class)
  public List<DistrictHouseAndResidentCountDto> getSonDistrictHouseAndResidentCountOfCurrentUser() {
    return this.statisticsService.getSonDistrictHouseAndResidentCountOfCurrentUser();
  }

  @GetMapping("pageOfLast")
  @JsonView(PageOfLastJsonView.class)
  public Page<Statistics> pageOfLast(@RequestParam(required = false) String userName, Pageable pageable) {
    return this.statisticsService.pageOfLast(userName, pageable);
  }

  private static class GetSonDistrictHouseAndResidentCountOfCurrentUserJsonView {
  }

  private static class PageOfLastJsonView implements
      Statistics.UserJsonView,
      User.DistrictJsonView {
  }
}
