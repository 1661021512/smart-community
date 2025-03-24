package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.*;
import club.yunzhi.smartcommunity.input.UpdateOwner;
import club.yunzhi.smartcommunity.repository.*;
import club.yunzhi.smartcommunity.repository.specs.HouseSpecs;
import com.mengyunzhi.core.exception.ObjectNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class HouseServiceImpl implements HouseService {
  private final Logger logger = LoggerFactory.getLogger(HouseServiceImpl.class);
  private final HouseRepository houseRepository;
  private final BuildingRepository buildingRepository;
  private final ResidentRepository residentRepository;
  private final DistrictService districtService;
  private final GriderService griderService;
  private final VillageRepository villageRepository;

  public HouseServiceImpl(HouseRepository houseRepository,
                          BuildingRepository buildingRepository,
                          ResidentRepository residentRepository,
                          DistrictService districtService,
                          GriderService griderService,
                          VillageRepository villageRepository) {
    this.houseRepository = houseRepository;
    this.buildingRepository = buildingRepository;
    this.residentRepository = residentRepository;
    this.districtService = districtService;
    this.griderService = griderService;
    this.villageRepository = villageRepository;
  }

  @Override
  public House save(@NotNull House house) {
    Assert.notNull(house, "house can not be null");
    Assert.notNull(house.getArea(), "house.area can not be null");
    Assert.notNull(house.getFloor(), "house.floor can not be null");
    Assert.notNull(house.getLowIncoming(), "house.lowIncoming can not be null");
    Assert.notNull(house.getName(), "house.name can not be null");
    Assert.notNull(house.getRelief(), "house.relief can not be null");
    Assert.notNull(house.getType(), "house.type can not be null");
    Assert.notNull(house.getUnit(), "house.unit can not be null");
    Assert.notNull(house.getUnit().getId(), "house.unit.id can not be null");
    Assert.notNull(house.getRemarks(), "house.remarks can not be null");

    House newHouse = new House();
    newHouse.setArea(house.getArea());
    newHouse.setFloor(house.getFloor());
    newHouse.setLowIncoming(house.getLowIncoming());
    newHouse.setName(house.getName());
    newHouse.setRelief(house.getRelief());
    newHouse.setType(house.getType());
    newHouse.setUnit(house.getUnit());
    newHouse.setRemarks(house.getRemarks());

    logger.debug("保存新住房");
    House _newHorse = this.houseRepository.save(house);
    logger.debug("清空当前用户的区域缓存");
    this.districtService.clearCurrentUserCache();
    return _newHorse;
  }

  @Override
  public long countByDistrict(District district) {
    List<District> districts = DistrictService.getAllChildren(district);
    return this.houseRepository.count(HouseSpecs.inDistricts(districts));
  }

  @Override
  public void batchRemoveGrider(List<Long> houseIds) {
    Iterable<House> houses = this.houseRepository.findAllById(houseIds);
    houses.forEach(house -> house.setGrider(null));
    this.houseRepository.saveAll(houses);
  }

  @Override
  public void delete(Long id) {
    House house = getById(id);
    this.houseRepository.deleteById(house.getId());
  }

  @Override
  public List<House> getAllByBuildingId(Long id) {
    logger.debug("获取楼房");
    Building building = this.buildingRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("楼房不存在"));

    logger.debug("获取楼房的单元");
    List<Unit> units = building.getUnits();
    List<House> houses = new ArrayList<>();
    units.forEach(unit -> {
      logger.debug("遍历获取到的所有单元，获取每个单元的房屋");
      List<House> houses1 = unit.getHouses();
      houses.addAll(houses1);
    });

    return houses;
  }

  @Override
  public House getById(Long id) {
    return this.houseRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("找不到相关房屋"));
  }

  @Override
  public Page<House> page(Short type,
                          Long villageId,
                          Long buildingId,
                          Long unitId,
                          String ownerName,
                          Long griderId,
                          Long excludedGriderId,
                          Boolean isExcludedGriderIsNotNull,
                          Pageable pageable) {
    Specification<House> specification;
    List<District> districts = new ArrayList<>();
    if (unitId != null) {
      logger.debug("第一种情况,传入unitId，说明前台选中了单元，那么只需要根据单元查询即可");
      specification = HouseSpecs.containingName(ownerName)
          .and(HouseSpecs.isType(type))
          .and(HouseSpecs.belongToUnit(unitId));
    } else {
      logger.debug("第二种，要判断传入楼房id没有");
      if (buildingId != null) {
        logger.debug("楼房存在，此时区域直接设置为该楼房即可");
        Building building = buildingRepository.findById(buildingId).orElseThrow(()
            -> new EntityNotFoundException("房屋实体未找到"));
        districts.add(building);
      } else {
        if (villageId != null) {
          logger.debug("楼房id不存在，小区id存在，获取该小区的所有子区域");
          Village village = villageRepository.findById(villageId)
              .orElseThrow(() -> new EntityNotFoundException("小区实体未找到"));
          districts = districtService.getChildrenWithItself(village);
        } else {
          logger.debug("既没传入楼房id也没有传入villageId");
          logger.debug("此时获取当前登陆用户的所有管辖区域");
          districts = districtService.getManageDistrictsWithCurrentLoginUser();
        }
      }
      specification = HouseSpecs.containingName(ownerName)
          .and(HouseSpecs.equalsGriderId(griderId))
          .and(HouseSpecs.inDistricts(districts))
          .and(HouseSpecs.isType(type));
    }
    specification = specification.and(HouseSpecs.notEqualsGriderId(excludedGriderId));
    if (isExcludedGriderIsNotNull  != null && isExcludedGriderIsNotNull) {
      specification = specification.and(HouseSpecs.griderIsNull());
    }

    return this.houseRepository.findAll(specification, pageable);
  }

  @Override
  public House update(Long id, House house) {
    logger.debug("获取原来的房屋");
    House house1 = this.houseRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("房屋实体不存在"));

    logger.debug("判断信息不存在");
    Assert.notNull(house.getType(), "住房类型未设置");
    Assert.notNull(house.getArea(), "房屋面积未设置");
    Assert.notNull(house.getRelief(), "未设置是否减免房屋补贴住房");
    Assert.notNull(house.getRemarks(), "未填写备注");
    Assert.notNull(house.getRemarks(), "未填写备注");
    Assert.notNull(house.getWeight(), "house.weight can not be null");
    Assert.notNull(house.getLowIncoming(), "house.lowIncoming can not be null");

    logger.debug("将属性进行赋值");
    house1.setType(house.getType());
    house1.setArea(house.getArea());
    house1.setName(house.getName());
    house1.setCheckInTime(house.getCheckInTime());
    house1.setLowIncoming(house.getLowIncoming());
    house1.setRelief(house.getRelief());
    house1.setRemarks(house.getRemarks());
    house1.setWeight(house.getWeight());

    return this.houseRepository.save(house1);
  }

  @Override
  public House updateOwner(Long id, UpdateOwner updateOwner) {
    logger.debug("首先查询房子的信息");
    House house = this.getById(id);

    Assert.notNull(updateOwner.getResidentId(), "居民id不能为空");
    Assert.notNull(updateOwner.getIsOwner(), "是否户主不能为空");

    Long residentId = updateOwner.getResidentId();
    Boolean isOwner = updateOwner.getIsOwner();

    logger.debug("根据isOwner来区分情况");
    if (isOwner) {
      Resident resident = this.residentRepository.findById(residentId).orElseThrow(() -> new EntityNotFoundException("居民实体不存在"));

      house.setOwner(resident);
    } else if (house.getOwner() != null) {
      if (residentId.equals(house.getOwner().getId())) {
        house.setOwner(null);
      }
    }

    return this.houseRepository.save(house);
  }

  @Override
  public List<House> saveAll(List<House> houses) {
    List<House> newHouses = new ArrayList<>();
    houses.forEach(house -> {
      Assert.notNull(house.getName(), "house.name is null");
      Assert.notNull(house.getWeight(), "house.weight is null");
      Assert.notNull(house.getUnit(), "house.unit is null");
      Assert.notNull(house.getUnit().getId(), "house unit id is null");

      House newHouse = new House();
      newHouse.setName(house.getName());
      newHouse.setFloor(house.getFloor());
      newHouse.setWeight(house.getWeight());
      newHouse.setUnit(house.getUnit());
      newHouses.add(newHouse);
    });

    return (List<House>) this.houseRepository.saveAll(newHouses);
  }

  @Override
  public void removeGrider(Long id) {
    House house = this.houseRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("对应的房屋未找到"));
    house.setGrider(null);
    this.houseRepository.save(house);
  }

  @Override
  public Page<House> pageOfCurrentGrider(Short type,
                                         Long villageId,
                                         Long buildingId,
                                         Long unitId,
                                         String ownerName,
                                         Pageable pageable) {
    Optional<Grider> griderOptional = this.griderService.getCurrentGrider();
    if (!griderOptional.isPresent()) {
      return Page.empty();
    }

    Specification<House> specification;
    List<District> districts = new ArrayList<>();
    if (unitId != null) {
      logger.debug("第一种情况,传入unitId，说明前台选中了单元，那么只需要根据单元查询即可");
      specification = HouseSpecs.containingName(ownerName)
          .and(HouseSpecs.isType(type))
          .and(HouseSpecs.belongToUnit(unitId));
    } else {
      logger.debug("第二种，要判断传入楼房id没有");
      if (buildingId != null) {
        logger.debug("楼房存在，此时区域直接设置为该楼房即可");
        Building building = buildingRepository.findById(buildingId).orElseThrow(()
            -> new EntityNotFoundException("房屋实体未找到"));
        districts.add(building);
      } else {
        if (villageId != null) {
          logger.debug("楼房id不存在，小区id存在，获取该小区的所有子区域");
          Village village = villageRepository.findById(villageId)
              .orElseThrow(() -> new EntityNotFoundException("小区实体未找到"));
          districts = districtService.getChildrenWithItself(village);
        } else {
          logger.debug("既没传入楼房id也没有传入villageId");
          logger.debug("此时获取当前登陆用户的所有管辖区域");
          districts = districtService.getManageDistrictsWithCurrentLoginUser();
        }
      }
      specification = HouseSpecs.containingName(ownerName)
          .and(HouseSpecs.inDistricts(districts))
          .and(HouseSpecs.isType(type));
    }

    specification = specification.and(HouseSpecs.equalsGrider(griderOptional.get()));

    return this.houseRepository.findAll(specification, pageable);
  }

  @Override
  public void updateGrider(Long id, Long griderId) {
    House house = this.houseRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("对应的房屋未找到"));
    Grider girder = new Grider();
    girder.setId(griderId);
    house.setGrider(girder);
    this.houseRepository.save(house);
    // todo: 使用切面来更新网格员管理的住房及居民数量
  }

  @Override
  public House updateHouseName(Long id, House house) {
    House house1 = this.getById(id);

    logger.debug("判断新名称是否合格");
    Assert.notNull(house.getName(), "name不能为空");

    logger.debug("更改房屋名称");
    house1.setName(house.getName());

    return this.houseRepository.save(house1);
  }
}
