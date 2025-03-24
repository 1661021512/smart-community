package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.District;
import club.yunzhi.smartcommunity.entity.Village;
import club.yunzhi.smartcommunity.repository.DistrictRepository;
import club.yunzhi.smartcommunity.repository.VillageRepository;
import club.yunzhi.smartcommunity.repository.specs.VillageSpecs;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class VillageServiceImpl implements VillageService {
  private final Logger logger = LoggerFactory.getLogger(VillageServiceImpl.class);
  private final VillageRepository villageRepository;
  private final DistrictRepository districtRepository;
  private final DistrictService districtService;
  private final BuildingService buildingService;

  public VillageServiceImpl(VillageRepository villageRepository,
                            DistrictRepository districtRepository,
                            DistrictService districtService,
                            BuildingService buildingService) {
    this.villageRepository = villageRepository;
    this.districtRepository = districtRepository;
    this.districtService = districtService;
    this.buildingService = buildingService;
  }

  @Override
  public List<Village> findAll() {
    return (List<Village>) this.villageRepository.findAll();
  }

  @Override
  public void delete(Long id) {
    Village village = getById(id);

    logger.debug("删除小区中的楼房");
    List<District> buildings = village.getBuildings();
    buildings.forEach(building -> {
      this.buildingService.delete(building.getId());
    });

    this.districtRepository.deleteById(village.getId());
  }

  @Override
  public Boolean existByName(String name) {
    return this.villageRepository.existsByNameAndDeletedIsFalse(name);
  }

  @Override
  public Village getById(Long id) {
    return this.villageRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("小区实体不存在"));
  }

  @Override
  public Page<Village> page(String name, Short houseType, Pageable pageable) {
    logger.debug("获取当前登陆用户的区域及子区域中的社区id");
    List<Long> communityIds = districtService.getAllDistrictIdsByTypeOfCurrentUser(District.TYPE_COMMUNITY);

    return this.villageRepository.findAll(VillageSpecs.containingName(name)
        .and(VillageSpecs.inCommunityIds(communityIds))
        .and(VillageSpecs.isHouseType(houseType)), pageable);
  }

  @Override
  public Village save(Village village) {
    Assert.notNull(village.getName(), "village name不能为空");
    Assert.notNull(village.getPinyin(), "village pinyin不能为空");
    Assert.notNull(village.getLatitude(), "village latitude不能为空");
    Assert.notNull(village.getLongitude(), "village longitude不能为空");
    Assert.notNull(village.getHouseType(), "village type不能为空");
    Assert.notNull(village.getCommunity(), "village community不能为空");
//    Assert.notNull(village.getModel(), "village Model不能为空");

    Village newVillage = new Village();
    logger.debug("将数据传入新小区");
    newVillage.setName(village.getName());
    newVillage.setPinyin(village.getPinyin());
    newVillage.setLatitude(village.getLatitude());
    newVillage.setLongitude(village.getLongitude());
    newVillage.setHouseType(village.getHouseType());
    newVillage.setCommunity(village.getCommunity());
    newVillage.setEstablishTime(village.getEstablishTime());
//    newVillage.setModel(village.getModel());

    logger.debug("将新小区保存");
    Village _village = this.villageRepository.save(newVillage);
    logger.debug("新小区保存时清空当前用户的区域缓存");
    this.districtService.clearCurrentUserCache();
    return _village;
  }

  @Override
  public Village update(Long id, Village village) {
    Village newVillage = getById(id);

    logger.debug("判断数据是否合格");
    Assert.notNull(village.getName(), "village name不能为空");
    Assert.notNull(village.getPinyin(), "village pinyin不能为空");
    Assert.notNull(village.getLatitude(), "village latitude不能为空");
    Assert.notNull(village.getLongitude(), "village longitude不能为空");
    Assert.notNull(village.getHouseType(), "village type不能为空");
    Assert.notNull(village.getCommunity(), "village community不能为空");
    Assert.notNull(village.getEstablishTime(), "village establishTime 不能为空");
//    Assert.notNull(village.getModel(), "village Model不能为空");

    logger.debug("保存数据");
    newVillage.setName(village.getName());
    newVillage.setPinyin(village.getPinyin());
    newVillage.setLatitude(village.getLatitude());
    newVillage.setLongitude(village.getLongitude());
    newVillage.setHouseType(village.getHouseType());
    newVillage.setEstablishTime(village.getEstablishTime());
    newVillage.setCommunity(village.getCommunity());
//    newVillage.setModel(village.getModel());

    return this.villageRepository.save(newVillage);
  }

}
