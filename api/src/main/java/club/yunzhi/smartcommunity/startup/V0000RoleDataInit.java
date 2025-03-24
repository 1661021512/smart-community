package club.yunzhi.smartcommunity.startup;

import club.yunzhi.smartcommunity.entity.Role;
import club.yunzhi.smartcommunity.enums.RoleType;
import club.yunzhi.smartcommunity.repository.RoleRepository;
import club.yunzhi.smartcommunity.service.MigrationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;

/**
 * 角色信息
 */
@Component
public class V0000RoleDataInit implements ApplicationListener<ContextRefreshedEvent>, Ordered {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  private final String batch = "V0000";
  public final static int order = DataInit.order + 1;
  private final MigrationService migrationService;
  private final RoleRepository roleRepository;

  public V0000RoleDataInit(MigrationService migrationService, RoleRepository roleRepository) {
    this.migrationService = migrationService;
    this.roleRepository = roleRepository;
  }

  @Override
  public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
    if (!this.migrationService.existsByBatch(this.batch)) {
      this.logger.debug("添加网格员角色");
      this.roleRepository.save(new Role(RoleType.GRIDER, 200, true));
      this.migrationService.save(this.batch);
    }
  }

  @Override
  public int getOrder() {
    return order;
  }
}
