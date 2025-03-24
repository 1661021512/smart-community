package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Role;
import club.yunzhi.smartcommunity.repository.RoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;

/**
 * 角色管理
 */
@Service
public class RoleServiceImpl implements RoleService {
  private final Logger logger = LoggerFactory.getLogger(ResidentServiceImpl.class);
  private final RoleRepository roleRepository;

  public RoleServiceImpl(RoleRepository roleRepository) {
    this.roleRepository = roleRepository;
  }

  @Override
  public Role add(Role role) {
    Role newRole = new Role();

    logger.debug("断言数据非空");
    Assert.notNull(role.getName(), "name不能为空");
    Assert.notNull(role.getValue(), "value不能为空");
    Assert.notNull(role.getWeight(), "weight不能为空");

    newRole.setName(role.getName());
    newRole.setValue(role.getValue());
    newRole.setWeight(role.getWeight());

    return this.roleRepository.save(newRole);
  }

  @Override
  public Role getById(Long id) {
    return this.roleRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("角色实体未找到"));
  }

  @Override
  public Page<Role> page(String name, Pageable pageable) {
    return this.roleRepository.getAll(name, pageable);
  }

  @Override
  public Role update(Long id, Role role) {
    Role role1 = getById(id);

    logger.debug("断言输入非空");
    Assert.notNull(role.getName(), "name不能为空");
    Assert.notNull(role.getWeight(), "weight不能为空");

    logger.debug("将数据重新赋值到新的角色");
    role1.setWeight(role.getWeight());
    role1.setValue(role.getValue());
    role1.setName(role.getName());

    return roleRepository.save(role1);
  }
}
