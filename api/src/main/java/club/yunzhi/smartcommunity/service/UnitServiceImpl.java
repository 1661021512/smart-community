package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.House;
import club.yunzhi.smartcommunity.entity.Unit;
import club.yunzhi.smartcommunity.repository.UnitRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import club.yunzhi.smartcommunity.repository.specs.UnitSpecs;
import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class UnitServiceImpl implements UnitService {

  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  private final UnitRepository unitRepository;
  private final HouseService houseService;

  public UnitServiceImpl(UnitRepository unitRepository,
                         HouseService houseService) {
    this.unitRepository = unitRepository;
    this.houseService = houseService;
  }

  @Override
  public Unit save(Unit unit) {
    Assert.notNull(unit.getBuilding(), "未传入building");
    Assert.notNull(unit.getBuilding().getId(), "未传入building.id");
    Assert.notNull(unit.getName(), "未传入NAME");
    Assert.notNull(unit.getWeight(), "权重不能为空");

    Unit newUnit = new Unit();
    newUnit.setBuilding(unit.getBuilding());
    newUnit.setName(unit.getName());
    newUnit.setWeight(unit.getWeight());
    return this.unitRepository.save(unit);
  }

  public Unit getById(Long id) {
    return this.unitRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("单元不存在"));
  }


  @Override
  public Unit update(Long id, Unit unit) {
    Assert.notNull(id, "id type must be number");
    Assert.notNull(unit.getWeight(), "weight must be number");
    Assert.notNull(unit.getName(), "name type must be string");

    Unit newUnit = this.getById(id);

    newUnit.setName(unit.getName());
    newUnit.setWeight(unit.getWeight());

    return this.unitRepository.save(newUnit);
  }

  @Override
  public List<Unit> getByBuildingId(Long id) {
    return this.unitRepository.findAll(UnitSpecs.isBuildingId(id));
  }

  @Override
  public void delete(Long id) {
    Unit unit = getById(id);

    logger.debug("删除单元中的房屋");
    List<House> houses = unit.getHouses();
    houses.forEach(house -> {
      this.houseService.delete(house.getId());
    });

    this.unitRepository.deleteById(unit.getId());
  }
}
