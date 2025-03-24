package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.User;
import club.yunzhi.smartcommunity.entity.WebUserDataStatistics;
import club.yunzhi.smartcommunity.service.UserDataStatisticsService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 * 用户数据统计
 */
@RestController
@RequestMapping("UserDataStatistics")
public class UserDataStatisticsController {
  private final UserDataStatisticsService userDataStatisticsService;

  public UserDataStatisticsController(UserDataStatisticsService userDataStatisticsService) {
    this.userDataStatisticsService = userDataStatisticsService;
  }

  @GetMapping("pageByBelongDistrictId/{districtId}")
  @JsonView(PageByBelongDistrictIdJsonView.class)
  Page<WebUserDataStatistics> pageByBelongDistrictId(@PathVariable Long districtId, Pageable pageable) {
    return this.userDataStatisticsService.pageByBelongDistrictId(districtId, pageable);
  }

  private static class PageByBelongDistrictIdJsonView implements WebUserDataStatistics.UserJsonView,
      User.DistrictJsonView {
  }
}
