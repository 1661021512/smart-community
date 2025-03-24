package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Resident;
import club.yunzhi.smartcommunity.entity.Vehicle;
import club.yunzhi.smartcommunity.repository.DistrictRepository;
import club.yunzhi.smartcommunity.repository.ResidentRepository;
import club.yunzhi.smartcommunity.repository.VehicleRepository;
import club.yunzhi.smartcommunity.repository.specs.VehicleSpecs;
import org.modelmapper.internal.util.Assert;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

/**
 * 车辆
 */
@Service
public class VehicleServiceImpl implements VehicleService {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  private final VehicleRepository vehicleRepository;
  private final ResidentRepository residentRepository;

  public VehicleServiceImpl(VehicleRepository vehicleRepository, ResidentRepository residentRepository, DistrictRepository districtRepository) {
    this.vehicleRepository = vehicleRepository;
    this.residentRepository = residentRepository;
  }

  @Override
  public void delete(Long id) {
    this.vehicleRepository.deleteById(id);
  }

  @Override
  public Vehicle getById(Long id) {
    return this.vehicleRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("找不到相关车辆"));
  }

  @Override
  public Page<Vehicle> page(Long villageId, Long typeId, String plateNumber, String ownerName, Pageable pageable) {
    return this.vehicleRepository.findAll(VehicleSpecs.containingPlateNumber(plateNumber)
            .and(VehicleSpecs.belongToType(typeId))
            .and(VehicleSpecs.belongToVillage(villageId))
            .and(VehicleSpecs.containingName(ownerName)), pageable);
  }

  @Override
  public Vehicle save(Vehicle vehicle) {
    Vehicle newVehicle = new Vehicle();
    logger.debug("首先调用validateField方法判断是否字段合规");
    this.validateFiled(vehicle);
    this.setData(vehicle, newVehicle);
    vehicleRepository.save(newVehicle);
    return newVehicle;
  }

  @Override
  public Vehicle update(Long id, Vehicle vehicle) {
    Vehicle newVehicle = this.getById(id);
    this.validateFiled(vehicle);
    this.setData(vehicle, newVehicle);
    vehicleRepository.save(newVehicle);
    return newVehicle;
  }

  public void setData(Vehicle vehicle, Vehicle newVehicle) {
    Resident owner = this.residentRepository.findById(vehicle.getOwner().getId()).orElseThrow(() -> new EntityNotFoundException("居民实体不存在"));
    newVehicle.setBrand(vehicle.getBrand());
    newVehicle.setType(vehicle.getType());
    newVehicle.setColour(vehicle.getColour());
    newVehicle.setOwner(owner);
    newVehicle.setPlateNumber(vehicle.getPlateNumber());
    newVehicle.setParkingSpaceNumber(vehicle.getParkingSpaceNumber());
    newVehicle.setParkingSpaceType(vehicle.getParkingSpaceType());
  }

  public void validateFiled(Vehicle vehicle) {
    Assert.notNull(vehicle.getOwner(), "车主不能为空");
    Assert.notNull(vehicle.getBrand(), "车辆品牌不能为空");
    Assert.notNull(vehicle.getType(), "车辆类型不能为空");
    Assert.notNull(vehicle.getColour(), "车辆颜色不能为空");
    Assert.notNull(vehicle.getPlateNumber(), "车牌号不能为空");
  }
}
