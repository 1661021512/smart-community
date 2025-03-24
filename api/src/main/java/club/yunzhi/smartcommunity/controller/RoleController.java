package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.Role;
import club.yunzhi.smartcommunity.repository.RoleRepository;
import club.yunzhi.smartcommunity.service.RoleService;
import com.fasterxml.jackson.annotation.JsonView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 角色管理
 */
@RestController
@RequestMapping("Role")
public class RoleController {
  private final Logger logger = LoggerFactory.getLogger(RoleController.class);

  private final RoleService roleService;
  private final RoleRepository roleRepository;

  public RoleController(RoleService roleService, RoleRepository roleRepository) {
    this.roleService = roleService;
    this.roleRepository = roleRepository;
  }

  @PostMapping
  @JsonView(AddJsonView.class)
  public Role add(@RequestBody Role role) {
    return this.roleService.add(role);
  }

  @GetMapping
  @JsonView(GetAllJsonView.class)
  public List<Role> getAll() {
    return (List<Role>) this.roleRepository.findAll();
  }

  @GetMapping("{id}")
  @JsonView(GetByIdJsonView.class)
  public Role getById(@PathVariable Long id) {
    return this.roleService.getById(id);
  }

  @GetMapping("page")
  @JsonView(PageJsonView.class)
  public Page<Role> page(
      @RequestParam(required = false, defaultValue = "") String name,
      @PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC)
          Pageable pageable) {
    return this.roleService.page(name, pageable);
  }

  @PutMapping("{id}")
  @JsonView(UpdateJsonView.class)
  public Role update(@PathVariable Long id, @RequestBody Role role) {
    return this.roleService.update(id, role);
  }

  public class AddJsonView {}
  public class GetByIdJsonView {}
  public class PageJsonView {}
  public class UpdateJsonView {}
  public class GetAllJsonView {}
}
