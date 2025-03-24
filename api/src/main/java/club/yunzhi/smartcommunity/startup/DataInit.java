package club.yunzhi.smartcommunity.startup;

import club.yunzhi.smartcommunity.entity.*;
import club.yunzhi.smartcommunity.properties.AppProperties;
import club.yunzhi.smartcommunity.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * 初始化测试账户
 * admin / admin
 */
@Component
public class DataInit implements ApplicationListener<ContextRefreshedEvent>, Ordered {

  private static final Logger logger = LoggerFactory.getLogger(DataInit.class);
  public final static int order = Integer.MIN_VALUE;
  private final WebUserRepository webUserRepository;
  private final DistrictRepository districtRepository;
  private final RoleRepository roleRepository;
  private final UserRepository userRepository;
  private final CountyRepository countyRepository;
  private final CrimedTypeRepository crimedTypeRepository;

  private final String username;
  public final String password;

  public DataInit(DistrictRepository districtRepository, AppProperties appProperties,
                  WebUserRepository webUserRepository,
                  RoleRepository roleRepository,
                  UserRepository userRepository, CountyRepository countyRepository,
                  CrimedTypeRepository crimedTypeRepository) {
    this.districtRepository = districtRepository;
    this.webUserRepository = webUserRepository;
    this.roleRepository = roleRepository;
    this.userRepository = userRepository;
    this.countyRepository = countyRepository;
    this.crimedTypeRepository = crimedTypeRepository;
    this.username = appProperties.getUsername();
    this.password = appProperties.getPassword();
  }

  @Override
  public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
    if (this.districtRepository.count() == 0) {
      logger.debug("初始化矫正类型");
      List<CrimedType> crimedTypes = new ArrayList<>();
      crimedTypes.add(new CrimedType(CrimedType.LABOR_EDUCATION, "劳教"));
      crimedTypes.add(new CrimedType(CrimedType.IN_PRISON, "服刑"));
      crimedTypes.add(new CrimedType(CrimedType.DRUG, "吸毒"));
      crimedTypeRepository.saveAll(crimedTypes);

      logger.debug("初始化县");
      County county = new County();
      county.setName("尚义县");
      this.countyRepository.save(county);

      logger.debug("初始仅仅将系统管理员角色存入数据库");
      Role adminRole = this.roleRepository.save(new Role("系统管理员", "admin", 0, true));

      logger.debug("初始化一个社区用户");
      this.roleRepository.save(new Role("社区用户", "user", 100, true));

      logger.debug("初始化一个系统管理员");
      WebUser webUser = new WebUser();
      webUser.setUsername(username);
      webUser.setName("超级管理员");
      webUser.setPassword(password);
      webUser.getRoles().add(adminRole);
      webUser.setDistrict(county);
      this.userRepository.save(webUser.getUser());
      webUserRepository.save(webUser);
    }
  }

  @Override
  public int getOrder() {
    return order;
  }
}
