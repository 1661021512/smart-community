package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.VehicleBrand;
import club.yunzhi.smartcommunity.repository.VehicleBrandRepository;
import club.yunzhi.smartcommunity.repository.specs.VehicleBrandSpecs;
import org.modelmapper.internal.util.Assert;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.validation.constraints.NotNull;

/**
 * 车辆品牌
 */
@Service
public class VehicleBrandServiceImpl implements VehicleBrandService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final VehicleBrandRepository vehicleBrandRepository;

    public VehicleBrandServiceImpl(VehicleBrandRepository vehicleBrandRepository) {
        this.vehicleBrandRepository = vehicleBrandRepository;
    }

    @Override
    public void delete(Long id) {
        this.vehicleBrandRepository.deleteById(id);
    }

    @Override
    public Boolean existByName(String name) {
        return this.vehicleBrandRepository.existsByNameAndDeletedIsFalse(name);
    }

    @Override
    public VehicleBrand getById(Long id) {
        return this.vehicleBrandRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("找不到相关车辆品牌"));
    }

    @Override
    public VehicleBrand getByName(String name) {
        return this.vehicleBrandRepository.findByNameAndDeletedIsFalse(name);
    }



    @Override
    public Page<VehicleBrand> page(String name, @NotNull Pageable pageable) {
        org.springframework.util.Assert.notNull(pageable, "传入的Pageable不能为null");
        Specification<VehicleBrand> specification = VehicleBrandSpecs.containingName(name);
        return this.vehicleBrandRepository.findAll(specification, pageable);
    }

    @Override
    public VehicleBrand save(VehicleBrand vehicleBrand) {
        logger.debug("若车辆品牌名称已存在，返回该车辆品牌");
        if (this.existByName(vehicleBrand.getName())) {
            return this.getByName(vehicleBrand.getName());
        }

        VehicleBrand newVehicleBrand = new VehicleBrand();
        logger.debug("首先调用validateField方法判断是否字段合规");
        this.validateFiled(vehicleBrand);
        newVehicleBrand.setName(vehicleBrand.getName());
        vehicleBrandRepository.save(newVehicleBrand);
        return newVehicleBrand;
    }

    @Override
    public VehicleBrand update(Long id, VehicleBrand vehicleBrand) {
        VehicleBrand newVehicleBrand = getById(id);
        newVehicleBrand.setName(vehicleBrand.getName());
        this.vehicleBrandRepository.save(newVehicleBrand);
        return newVehicleBrand;
    }

    public void validateFiled(VehicleBrand vehicleBrand) {
        Assert.notNull(vehicleBrand.getName(), "品牌名称不能为空");
    }
}
