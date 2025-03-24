package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Duty;
import club.yunzhi.smartcommunity.entity.PartyBuilding;
import club.yunzhi.smartcommunity.entity.WebUser;
import club.yunzhi.smartcommunity.repository.PartyBuildingRepository;
import club.yunzhi.smartcommunity.repository.specs.PartBuildingSpecs;
import com.mengyunzhi.core.exception.ObjectNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import javax.validation.constraints.NotNull;
import java.util.List;

@Service
public class PartyBuildingServiceImpl implements PartyBuildingService {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  private final PartyBuildingRepository partyBuildingRepository;
  private final WebUserService webUserService;

  public PartyBuildingServiceImpl(PartyBuildingRepository partyBuildingRepository,
                                  WebUserService webUserService) {
    this.partyBuildingRepository = partyBuildingRepository;
    this.webUserService = webUserService;
  }

  @Override
  public PartyBuilding getByDutyIdAndDistrictId(Long dutyId, Long districtId) {
    return this.partyBuildingRepository.findByDutyIdAndDistrictIdAndDeletedIsFalse(dutyId, districtId);
  }

  @Override
  public PartyBuilding getByDutyIdOfCurrentDistrict(Long dutyId) {
    WebUser user = this.webUserService.getCurrentLoginWebUser().orElseThrow(RuntimeException::new);
    return this.getByDutyIdAndDistrictId(dutyId, user.getDistrict().getId());
  }

  @Override
  public PartyBuilding getById(Long id) {
    return this.partyBuildingRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException(String.valueOf(id)));
  }

  @Override
  public void deleteById(Long id) {
    this.partyBuildingRepository.deleteById(id);
  }

  @Override
  public List<PartyBuilding> getAllOfCurrentUserDistrict() {
    logger.debug("首先获取当前登陆用户的区域类型");
    WebUser currentUser = this.webUserService.getCurrentLoginWebUser()
        .orElseThrow(() -> new EntityNotFoundException("当前登陆用户不存在"));

    return this.partyBuildingRepository.findAll(
        PartBuildingSpecs.equalDistrictId(currentUser.getDistrict().getId()));
  }

  @Override
  public List<PartyBuilding> getAllByDistrictId(Long districtId) {
    Assert.notNull(districtId, "区域id不能为空");
    return this.partyBuildingRepository.findAllByDistrictIdAndDeletedIsFalse(districtId);
  }

  @Override
  public PartyBuilding save(PartyBuilding partyBuilding) {
    PartyBuilding newPartyBuilding = new PartyBuilding();

    logger.debug("首先调用validateField方法判断是否字段合规");
    validateField(partyBuilding);

    logger.debug("设置newPartBuilding");
    setData(partyBuilding, newPartyBuilding);

    return this.partyBuildingRepository.save(newPartyBuilding);
  }

  @Override
  public PartyBuilding saveOfCurrentDistrict(@NotNull Duty duty, @NotNull String personalName) {
    Assert.notNull(duty.getId(), "岗位ID不能为null");
    WebUser user = this.webUserService.getCurrentLoginWebUser().orElseThrow(RuntimeException::new);
    PartyBuilding partyBuilding = new PartyBuilding();
    partyBuilding.setDistrict(user.getDistrict());
    partyBuilding.setPersonName(personalName);
    partyBuilding.setDuty(duty);
    return this.partyBuildingRepository.save(partyBuilding);
  }

  @Override
  public void validateField(PartyBuilding partyBuilding) {
    Assert.notNull(partyBuilding.getPersonName(), "对应用户不能为空");
    Assert.notNull(partyBuilding.getDistrict(), "对应区域不能为空");
    Assert.notNull(partyBuilding.getDistrict().getId(), "区域id不存在");
    Assert.notNull(partyBuilding.getDuty(), "岗位不能为空");
    Assert.notNull(partyBuilding.getDuty().getId(), "岗位id不存在");
  }

  @Override
  public void setData(PartyBuilding partyBuilding, PartyBuilding newPartyBuilding) {
    newPartyBuilding.setPersonName(partyBuilding.getPersonName());
    newPartyBuilding.setDistrict(partyBuilding.getDistrict());
    newPartyBuilding.setDuty(partyBuilding.getDuty());
  }

  @Override
  public PartyBuilding update(Long dutyId, Long districtId, PartyBuilding partyBuilding) {
    logger.debug("断言user不为空");
    Assert.notNull(partyBuilding.getPersonName(), "用户名称不能为空");

    logger.debug("根据岗位和区域id获取党建信息");
    PartyBuilding oldPartyBuilding = getByDutyIdAndDistrictId(dutyId, districtId);

    logger.debug("设置旧党建的值");
    oldPartyBuilding.setPersonName(partyBuilding.getPersonName());

    return this.partyBuildingRepository.save(oldPartyBuilding);
  }

  @Override
  public PartyBuilding updateById(@NotNull Long id, @NotNull PartyBuilding partyBuilding) {
    Assert.notNull(partyBuilding.getPersonName(), "人员名称不能为空");
    PartyBuilding oldPartyBuilding = this.getById(id);
    oldPartyBuilding.setPersonName(partyBuilding.getPersonName());
    this.partyBuildingRepository.save(oldPartyBuilding);
    return partyBuilding;
  }
}
