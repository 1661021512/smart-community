package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.DistrictDataStatistics;
import club.yunzhi.smartcommunity.service.DistrictDataStatisticsService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 区域数据统计信息
 */
@RestController
@RequestMapping("DistrictDataStatistics")
public class DistrictDataStatisticsController {
  private final DistrictDataStatisticsService districtDataStatisticsService;

  public DistrictDataStatisticsController(DistrictDataStatisticsService districtDataStatisticsService) {
    this.districtDataStatisticsService = districtDataStatisticsService;
  }

  @GetMapping("{id}")
  @JsonView(GetByIdJsonView.class)
  public DistrictDataStatistics getById(@PathVariable Long id) {
    return this.districtDataStatisticsService.findById(id);
  }

  @GetMapping("getByDistrictId/{districtId}")
  @JsonView(GetByDistrictIdJsonView.class)
  public DistrictDataStatistics getByDistrictId(@PathVariable Long districtId) {
    return this.districtDataStatisticsService.findByDistrictId(districtId);
  }

  @GetMapping("getSonDistrictDataByDistrictId/{districtId}")
  @JsonView(GetSonDistrictDataByDistrictIdJsonView.class)
  public List<DistrictDataStatistics> getSonDistrictDataByDistrictId(@PathVariable Long districtId) {
    return this.districtDataStatisticsService.getSonDistrictDataByDistrictId(districtId);
  }

  private static class GetByIdJsonView {
  }

  private static class GetByDistrictIdJsonView implements
      DistrictDataStatistics.DistrictJsonView {
  }

  private static class GetSonDistrictDataByDistrictIdJsonView implements
      DistrictDataStatistics.DistrictJsonView {
  }
}
