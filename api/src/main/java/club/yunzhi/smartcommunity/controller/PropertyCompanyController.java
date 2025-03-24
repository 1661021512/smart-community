package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.*;
import club.yunzhi.smartcommunity.service.PropertyCompanyService;
import com.fasterxml.jackson.annotation.JsonView;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;


/**
 * 物业公司
 */
@RestController
@RequestMapping("propertyCompany")
public class PropertyCompanyController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private PropertyCompanyService propertyCompanyService;

    public PropertyCompanyController(PropertyCompanyService propertyCompanyService) {
        this.propertyCompanyService = propertyCompanyService;
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        this.propertyCompanyService.delete(id);
    }

    @GetMapping("{id}")
    @JsonView(GetByIdJsonView.class)
    public PropertyCompany getById(@PathVariable Long id) {
        return this.propertyCompanyService.getById(id);
    }

    @GetMapping("page")
    @JsonView(PropertyCompanyController.PageJsonViewWeb.class)
    public Page<PropertyCompany> page(
            @RequestParam(required = false) String name,
            @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC)) Pageable pageable
    ) {
        return this.propertyCompanyService.page(name, pageable);
    }

    @PostMapping
    @JsonView(SaveJsonView.class)
    public PropertyCompany save(@RequestBody PropertyCompany propertyCompany) {
        return this.propertyCompanyService.save(propertyCompany);
    }
    
    @PutMapping("{id}")
    @JsonView(UpdateJsonView.class)
    public PropertyCompany update(@PathVariable Long id, @RequestBody PropertyCompany propertyCompany) {
        return this.propertyCompanyService.update(id, propertyCompany);
    }


    public static class GetByIdJsonView implements PropertyCompany.VillageJsonView,
            BaseEntity.CreateTimeJsonView{
    }

    public static class PageJsonViewWeb implements PropertyCompany.VillageJsonView,
            BaseEntity.CreateTimeJsonView{
    }

    public static class SaveJsonView implements PropertyCompany.VillageJsonView {
    }

    public static class UpdateJsonView implements PropertyCompany.VillageJsonView{
    }
}
