package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.VehicleType;
import club.yunzhi.smartcommunity.service.VehicleTypeService;
import com.fasterxml.jackson.annotation.JsonView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 车辆类型
 */
@RestController
@RequestMapping("vehicleType")
public class VehicleTypeController {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  private VehicleTypeService vehicleTypeService;

  public VehicleTypeController(VehicleTypeService vehicleTypeService) {
    this.vehicleTypeService = vehicleTypeService;
  }


  @DeleteMapping("{id}")
  public void delete(@PathVariable Long id) {
    this.vehicleTypeService.delete(id);
  }

  @GetMapping("nameIsAvailable")
  @JsonView(NameIsAvailableJsonView.class)
  public Boolean nameIsAvailable(@RequestParam String name,
                                 @RequestParam(required = false, defaultValue = "") Long id) {
    return this.vehicleTypeService.nameIsAvailable(name, id);
  }

  @GetMapping()
  @JsonView(GetAllJsonView.class)
  public List<VehicleType> getAll() {
    return this.vehicleTypeService.getAll();
  }

  @GetMapping("{id}")
  @JsonView(GetByIdJsonView.class)
  public VehicleType getById(@PathVariable Long id) {
    return this.vehicleTypeService.getById(id);
  }

  @GetMapping("page")
  @JsonView(PageJsonView.class)
  public Page<VehicleType> page(
          @RequestParam(required = false, defaultValue = "") String name,
          @SortDefault.SortDefaults(@SortDefault(sort = "weight", direction = Sort.Direction.ASC)) Pageable pageable
  ) {
    return this.vehicleTypeService.page(name, pageable);
  }

  @PostMapping
  @JsonView(SaveJsonView.class)
  public VehicleType save(@RequestBody VehicleType vehicleType) {
    return this.vehicleTypeService.save(vehicleType);
  }

  @PutMapping("{id}")
  @JsonView(UpdateJsonView.class)
  public VehicleType update(@PathVariable Long id, @RequestBody VehicleType vehicleType) {
    return this.vehicleTypeService.update(id, vehicleType);
  }

  private static class NameIsAvailableJsonView {
  }
  public static class GetAllJsonView {
  }

  public static class GetByIdJsonView {
  }

  private static class PageJsonView {
  }

  private static class UpdateJsonView {
  }

  public static class SaveJsonView {
  }

}
