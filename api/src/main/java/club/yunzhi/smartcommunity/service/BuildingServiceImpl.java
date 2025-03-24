package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.*;
import club.yunzhi.smartcommunity.repository.BuildingRepository;
import club.yunzhi.smartcommunity.repository.DistrictRepository;
import club.yunzhi.smartcommunity.repository.specs.BuildingSpecs;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import java.util.List;

/**
 * 住房服务层接口实现
 */
@Service
public class BuildingServiceImpl implements BuildingService {

  private final Logger logger = LoggerFactory.getLogger(BuildingServiceImpl.class);

  private final BuildingRepository buildingRepository;
  private final DistrictRepository districtRepository;
  private final DistrictService districtService;
  private final UnitService unitService;

  public BuildingServiceImpl(BuildingRepository buildingRepository,
                             DistrictRepository districtRepository,
                             DistrictService districtService,
                             UnitService unitService) {
    this.buildingRepository = buildingRepository;
    this.districtRepository = districtRepository;
    this.districtService = districtService;
    this.unitService = unitService;
  }

  @Override
  public List<Building> getAllByVillageId(Long villageId) {
    return this.buildingRepository.findAll(BuildingSpecs.belongToVillage(villageId));
  }

  @Override
  public Building save(Building building1) {
    Building building = new Building();

    logger.debug("判断数据是否合格");
    Assert.notNull(building1.getName(), "name不能为空");
    Assert.notNull(building1.getHorizontalOffset(), "水平偏移不能为空");
    Assert.notNull(building1.getHouseType(), "类型不能为空");
    Assert.notNull(building1.getVillage().getId(), "所属小区不能为空");
    Assert.notNull(building1.getUnitCount(), "单元总数不能为空");
    Assert.notNull(building1.getMaxFloor(), "最高楼未设置");
    Assert.notNull(building1.getHousesLengthOfFloor(), "每层户数未设置");
    Assert.notNull(building1.getVerticalOffset(), "垂直偏移未设置");

    logger.debug("保存数据");
    building.setName(building1.getName());
    building.setHorizontalOffset(building1.getHorizontalOffset());
    building.setHousesLengthOfFloor(building1.getHousesLengthOfFloor());
    building.setUnitCount(building1.getUnitCount());
    building.setHouseType(building1.getHouseType());
    building.setMaxFloor(building1.getMaxFloor());
    building.setVerticalOffset(building1.getVerticalOffset());
    building.setVillage(building1.getVillage());

    return this.buildingRepository.save(building);
  }

  @Override
  public void delete(Long id) {
    Building building = getById(id);

    logger.debug("获取楼房中的单元");
    List<Unit> units = building.getUnits();

    logger.debug("删除楼房中的单元");
    units.forEach(unit -> {
      this.unitService.delete(unit.getId());
    });

    this.districtRepository.deleteById(building.getId());
  }


  @Override
  public Building getById(Long id) {
    return this.buildingRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("找不到相关乡镇"));
  }

  @Override
  public Page<Building> page(String name, Long villageId, Short houseType, Pageable pageable) {
    logger.debug("获取当前登陆用户的区域及子区域中的小区id");
    List<Long> villageIds = districtService.getAllDistrictIdsByTypeOfCurrentUser(District.TYPE_VILLAGE);

    return this.buildingRepository.findAll(BuildingSpecs.containingName(name)
        .and(BuildingSpecs.belongToVillage(villageId))
        .and(BuildingSpecs.equalHouseType(houseType))
        .and(BuildingSpecs.inVillageIds(villageIds)), pageable);
  }


  @Override
  public Building update(Long id, Building Building1) {
    Building Building = getById(id);

    logger.debug("判断数据是否合格");
    Assert.notNull(Building1.getName(), "name不能为空");
    Assert.notNull(Building1.getHorizontalOffset(), "水平偏移不能为空");
    Assert.notNull(Building1.getHouseType(), "类型不能为空");
    Assert.notNull(Building1.getUnitCount(), "单元总数不能为空");
    Assert.notNull(Building1.getMaxFloor(), "最高楼未设置");
    Assert.notNull(Building1.getVerticalOffset(), "垂直偏移未设置");
    Assert.notNull(Building1.getHousesLengthOfFloor(), "每层户数未设置");

    logger.debug("保存数据");
    Building.setName(Building1.getName());
    Building.setHorizontalOffset(Building1.getHorizontalOffset());
    Building.setUnitCount(Building1.getUnitCount());
    Building.setHouseType(Building1.getHouseType());
    Building.setMaxFloor(Building1.getMaxFloor());
    Building.setVerticalOffset(Building1.getVerticalOffset());
    Building.setHousesLengthOfFloor(Building1.getHousesLengthOfFloor());

    return this.buildingRepository.save(Building);
  }
}
