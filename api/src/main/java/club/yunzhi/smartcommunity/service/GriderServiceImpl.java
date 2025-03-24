package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.*;
import club.yunzhi.smartcommunity.enums.RoleType;
import club.yunzhi.smartcommunity.repository.*;
import club.yunzhi.smartcommunity.repository.specs.GriderSpecs;
import com.mengyunzhi.core.exception.AccessDeniedException;
import com.mengyunzhi.core.exception.ObjectNotFoundException;
import com.mengyunzhi.core.exception.ValidationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;

/**
 * 网格员服务层
 */
@Service
public class GriderServiceImpl implements GriderService {
  private final Logger logger = LoggerFactory.getLogger(GriderServiceImpl.class);
  private final GriderRepository griderRepository;
  private final WebUserRepository webUserRepository;
  private final WebUserService webUserService;
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final DistrictRepository districtRepository;
  private final DistrictService districtService;

  public GriderServiceImpl(GriderRepository griderRepository,
                           WebUserRepository webUserRepository, WebUserService webUserService, UserRepository userRepository, RoleRepository roleRepository, DistrictRepository districtRepository, DistrictService districtService) {
    this.griderRepository = griderRepository;
    this.webUserRepository = webUserRepository;
    this.webUserService = webUserService;
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.districtRepository = districtRepository;
    this.districtService = districtService;
  }

  @Override
  public Grider getById(Long id) {
    return this.griderRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("实体未找到"));
  }

  @Override
  public void deleteById(Long id) {
    Grider grider = this.griderRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("未找到实体" + id));
    if (grider.getHouses().size() > 0) {
      throw new ValidationException("请先移除网格员" + grider.getWebUser().getName() + "负责的住房后再次操作");
    }
    this.griderRepository.deleteById(id);
  }

  @Override
  public Grider save(Grider grider) {
    logger.debug("首先进行数据的验证");
    Assert.notNull(grider.getCommunity(), "community不能为空");
    Assert.notNull(grider.getWebUser(), "user不能为空");
    Assert.notNull(grider.getWebUser().getUsername(), "user.username不能为空");
    Assert.notNull(grider.getWebUser().getName(), "user.name不能为空");
    Assert.notNull(grider.getCommunity(), "community不能为空");
    Assert.notNull(grider.getCommunity().getId(), "community.id不能为空");
    Optional<District> district = this.districtRepository.findById(grider.getCommunity().getId());

    logger.debug("对传入的社区进行校验");
    if (!district.isPresent()
        || !district.get().getType().equals(District.TYPE_COMMUNITY)
        || !this.districtService.checkManageAccessOfCurrentUser(district.get().getId())) {
      throw new ValidationException("传入了错误的社区信息");
    }

    logger.debug("看当前是否存在用户，存在则直接调用，否则新建用户");
    Optional<WebUser> userOptional = this.webUserRepository.findByUsernameAndDeletedIsFalse(grider.getWebUser().getUsername());
    WebUser webUser;
    if (userOptional.isPresent()) {
      webUser = userOptional.get();
    } else {
      webUser = new WebUser();
      webUser.setUsername(grider.getWebUser().getUsername());
      webUser.setName(grider.getWebUser().getName());
      Role role = this.roleRepository.findByValueAndDeletedIsFalse(RoleType.GRIDER.getValue()).orElseThrow(RuntimeException::new);
      webUser.getRoles().add(role);
      webUser.setDistrict(grider.getCommunity());
      this.userRepository.save(webUser.getUser());
      webUser = webUserRepository.save(webUser);
    }

    logger.debug("保存实体");
    Grider newGrider = new Grider();
    newGrider.setCommunity(grider.getCommunity());
    newGrider.setWebUser(webUser);

    return this.griderRepository.save(newGrider);
  }

  @Override
  public Boolean existByGriderName(String username) {
    return this.webUserRepository.findByUsernameAndDeletedIsFalse(username).isPresent();
  }

  @Override
  public Boolean existByUsername(String username) {
    return this.griderRepository.findAll(GriderSpecs.equalUsername(username)).size() != 0;
  }

  @Override
  public Grider getGriderByUserId(Long userId) {
    return this.griderRepository.findByWebUserUserIdAndDeletedIsFalse(userId).orElse(null);
  }

  @Override
  public Page<Grider> page(String name, Pageable pageable) {
    return this.griderRepository.findAll(
        GriderSpecs.containingName(name),
        pageable);
  }

  @Override
  public Optional<Grider> getCurrentGrider() {
    WebUser user = this.webUserService.getCurrentLoginWebUser().orElseThrow(RuntimeException::new);
    return this.griderRepository.findByWebUserIdAndDeletedIsFalse(user.getId());
  }

  @Override
  public Grider getGriderByHouseId(Long houseId) {
    return this.griderRepository.findByHousesIdAndDeletedIsFalse(houseId);
  }

  @Override
  public void updateById(Long id, Grider newGrider) {
    Assert.notNull(newGrider.getCommunity(), "社区不能为空");
    Assert.notNull(newGrider.getCommunity().getId(), "社区ID不能为空");
    Assert.notNull(newGrider.getWebUser(), "用户不能为空");
    Assert.notNull(newGrider.getWebUser().getName(), "用户姓名不能为空");

    this.logger.debug("权限校验");
    Grider grider = this.griderRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("未找到" + id + "的相关网格员"));
    if (!this.districtService.checkManageAccessOfCurrentUser(grider.getCommunity().getId()) ||
        !this.districtService.checkManageAccessOfCurrentUser(newGrider.getCommunity().getId())) {
      throw new AccessDeniedException("权限错误");
    }

    this.logger.debug("分别保存数据");
    grider.setCommunity(newGrider.getCommunity());
    this.griderRepository.save(grider);

    grider.getWebUser().setName(newGrider.getWebUser().getName());
    this.webUserRepository.save(grider.getWebUser());
  }

  @Override
  @Async
  @Transactional(propagation = Propagation.REQUIRES_NEW)
  public void updateHouseAndResidentCount(Long girder) {
    Grider grider = this.getById(girder);
    this.updateHouseAndResidentCountByGrider(grider);
  }

  @Override
  @Async
  @Transactional(propagation = Propagation.REQUIRED)
  public void updateHouseAndResidentCountByGrider(@NotNull Grider grider) {
    try {
      Long griderId = grider.getId();
      grider = this.griderRepository.findById(griderId)
          .orElseThrow(() -> new ObjectNotFoundException("网格员：" + griderId + "未找到"));
      List<House> houses = grider.getHouses();
      grider.setHouseCount(Long.valueOf(houses.size()));
      long residentCount = 0;
      for(House house: houses) {
        residentCount += house.getResidents().size();
      }
      grider.setResidentCount(residentCount);
      this.griderRepository.save(grider);
    } catch (Exception e) {
      this.logger.error("执行updateHouseAndResidentCountByGrider时发生异常：" + e.getMessage());
    }
  }
}
