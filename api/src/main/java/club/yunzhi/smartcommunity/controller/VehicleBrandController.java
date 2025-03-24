package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.VehicleBrand;
import club.yunzhi.smartcommunity.service.VehicleBrandService;
import com.fasterxml.jackson.annotation.JsonView;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;

/**
 * 车辆品牌
 */
@RestController
@RequestMapping("vehicleBrand")
public class VehicleBrandController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private VehicleBrandService vehicleBrandService;

    public VehicleBrandController(VehicleBrandService vehicleBrandService) {
        this.vehicleBrandService = vehicleBrandService;
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        this.vehicleBrandService.delete(id);
    }

    @GetMapping("existByName")
    @JsonView(ExistByNameJsonView.class)
    public Boolean existByName(@RequestParam String name) {
        return this.vehicleBrandService.existByName(name);
    }

    @GetMapping("page")
    @JsonView(PageJsonView.class)
    public Page<VehicleBrand> page(
            @RequestParam(required = false, defaultValue = "") String name,
            @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC)) Pageable pageable
    ) {
        return this.vehicleBrandService.page(name, pageable);
    }

    @PostMapping
    @JsonView(SaveJsonView.class)
    public VehicleBrand save(@RequestBody VehicleBrand vehicleBrand) {
        return this.vehicleBrandService.save(vehicleBrand);
    }

    @PutMapping("{id}")
    @JsonView(UpdateJsonView.class)
    public VehicleBrand update(@PathVariable Long id, @RequestBody VehicleBrand vehicleBrand) {
        return this.vehicleBrandService.update(id, vehicleBrand);
    }

    private static class ExistByNameJsonView {

    }

    private static class PageJsonView {
    }

    private static class UpdateJsonView {

    }

    public static class SaveJsonView {
    }
}
