package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.*;
import club.yunzhi.smartcommunity.service.DistrictService;
import com.fasterxml.jackson.annotation.JsonView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("district")
public class DistrictController {
  private final Logger logger = LoggerFactory.getLogger(DistrictController.class);

  private DistrictService districtService;

  public DistrictController(DistrictService districtService) {
    this.districtService = districtService;
  }

  /**
   * 清空所有的缓存
   */
  @GetMapping("clearCache")
  public void clearCache() {
    this.logger.info("清空区域缓存(正常情况下不会被频繁调用)");
    this.districtService.clearCache();
  }

  @GetMapping("county")
  @JsonView(GetCountyJsonView.class)
  public County getCounty() {
    return this.districtService.getCounty();
  }


  @PatchMapping("updateGeoMap/{id}")
  @JsonView(UpdateGeoMapJsonView.class)
  public District updateGeoMap(@PathVariable Long id, @RequestBody District district) {
    return this.districtService.updateGeoMap(id, district.getGeoJson(), district.getSecondaryGeoJson());
  }


  public class GetCountyJsonView implements
      County.TownsJsonView,
      Town.CommunitiesJsonView,
      Community.VillagesJsonView,
      District.GeoJsonJsonView,
      Attachment.MyFileJsonView,
      Village.BuildingsJsonView {
  }

  private class UpdateGeoMapJsonView implements District.GeoJsonJsonView {
  }
}
