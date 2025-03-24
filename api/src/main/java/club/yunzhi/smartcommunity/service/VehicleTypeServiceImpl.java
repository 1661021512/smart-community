package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.VehicleType;
import club.yunzhi.smartcommunity.repository.VehicleTypeRepository;
import club.yunzhi.smartcommunity.repository.specs.VehicleTypeSpecs;
import org.modelmapper.internal.util.Assert;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.validation.constraints.NotNull;
import java.util.Objects;
import java.util.List;

/**
 * 车辆类型
 */
@Service
public class VehicleTypeServiceImpl implements VehicleTypeService {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  private final VehicleTypeRepository vehicleTypeRepository;

  public VehicleTypeServiceImpl(VehicleTypeRepository vehicleTypeRepository) {
    this.vehicleTypeRepository = vehicleTypeRepository;
  }

  @Override
  public void delete(Long id) {
    this.vehicleTypeRepository.deleteById(id);
  }

  @Override
  public List<VehicleType> getAll() {
    return (List<VehicleType>) this.vehicleTypeRepository.findAll();
  }

  @Override
  public VehicleType getById(Long id) {
    return this.vehicleTypeRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("找不到相关车辆类型"));
  }

  @Override
  public Boolean nameIsAvailable(String name, Long id) {
    Assert.notNull(name, "车辆类型名称不能为空");

    if (id != null) {
      VehicleType vehicleType = this.vehicleTypeRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("找不到相关车辆类型"));
      // 传入id时， 存在并与传入的id的实体name相同 则可用
      if (name.trim().equals(vehicleType.getName())) {
        return true;
      }
    }
    // 其余情况，不存在则可用
    return !this.vehicleTypeRepository.existsByNameAndDeletedIsFalse(name);
  }

  @Override
  public Page<VehicleType> page(String name, @NotNull Pageable pageable) {
    org.springframework.util.Assert.notNull(pageable, "传入的Pageable不能为null");
    Specification<VehicleType> specification = VehicleTypeSpecs.containingName(name);
    return this.vehicleTypeRepository.findAll(specification, pageable);
  }

  @Override
  public VehicleType save(VehicleType vehicleType) {
    VehicleType newVehicleType = new VehicleType();
    logger.debug("判断字段是否合规");
    Assert.notNull(vehicleType.getName(), "车辆类型名称不能为空");
    Assert.notNull(vehicleType.getWeight(), "车辆类型权重不能为空");
    newVehicleType.setName(vehicleType.getName());
    newVehicleType.setWeight(vehicleType.getWeight());
    vehicleTypeRepository.save(newVehicleType);
    return newVehicleType;
  }

  @Override
  public VehicleType update(Long id, VehicleType vehicleType) {
    VehicleType newVehicleType = getById(id);
    Assert.notNull(vehicleType.getName(), "车辆类型名称不能为空");
    Assert.notNull(vehicleType.getWeight(), "车辆类型权重不能为空");
    newVehicleType.setName(vehicleType.getName());
    newVehicleType.setWeight(vehicleType.getWeight());
    this.vehicleTypeRepository.save(newVehicleType);
    return newVehicleType;
  }
}
