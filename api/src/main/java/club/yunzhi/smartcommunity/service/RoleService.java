package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * 角色管理服务层接口
 */
public interface RoleService {
  /**
   * 新增角色
   * @param role
   * @return
   */
  Role add(Role role);

  /**
   * 根据id获取角色对象
   * @param id
   * @return
   */
  Role getById(Long id);

  /**
   * 分页查询
   * @param name
   * @param pageable
   * @return
   */
  Page<Role> page(String name, Pageable pageable);

  /**
   * 更新
   * @param id
   * @param role
   * @return
   */
  Role update(Long id, Role role);
}
