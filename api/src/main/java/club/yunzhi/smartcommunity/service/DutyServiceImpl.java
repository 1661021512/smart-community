package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Duty;
import club.yunzhi.smartcommunity.repository.DutyRepository;
import club.yunzhi.smartcommunity.repository.specs.DutySpecs;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import java.util.List;

/**
 * 职务管理M层
 */
@Service
public class DutyServiceImpl implements DutyService {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  private final DutyRepository dutyRepository;

  public DutyServiceImpl(DutyRepository dutyRepository) {
    this.dutyRepository = dutyRepository;
  }

  @Override
  public Page<Duty> page(String name, Pageable pageable) {
    return this.dutyRepository.findAll(DutySpecs.containingName(name), pageable);
  }

  @Override
  public Duty save(Duty duty) {
    logger.debug("进行数据的断言");
    Assert.notNull(duty, "传入的post不能为空");
    Assert.notNull(duty.getName(), "传入的name不能为空");
    Assert.notNull(duty.getWeight(), "传入的weight不能为空");
    Assert.isTrue(validateTypeOfDistrict(duty.getTypeOfDistrict()),
        "传入的typeOfDistrict不合规");

    Duty duty1 = new Duty();
    duty1.setName(duty.getName());
    duty1.setWeight(duty.getWeight());
    duty1.setTypeOfDistrict(duty.getTypeOfDistrict());

    return this.dutyRepository.save(duty1);
  }

  @Override
  public Boolean validateTypeOfDistrict(String type) {
    return type.equals(Duty.POST_TOWN) || type.equals(Duty.POST_COMMUNITY);
  }

  @Override
  public List<Duty> getAllByDistrictType(String type) {
    return this.dutyRepository.findAll(DutySpecs.equalType(type));
  }

  @Override
  public void delete(Long id) {
    this.dutyRepository.deleteById(id);
  }

  @Override
  public Duty getById(Long id) {
    return this.dutyRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("岗位实体未找到"));
  }

  @Override
  public Duty update(Long id, Duty duty) {
    logger.debug("进行数据的断言");
    Assert.notNull(duty, "传入的post不能为空");
    Assert.notNull(duty.getName(), "传入的name不能为空");
    Assert.notNull(duty.getWeight(), "传入的weight不能为空");
    Assert.isTrue(validateTypeOfDistrict(duty.getTypeOfDistrict()),
        "传入的typeOfDistrict不合规");

    Duty duty1 = getById(id);
    duty1.setName(duty.getName());
    duty1.setWeight(duty.getWeight());
    duty1.setTypeOfDistrict(duty.getTypeOfDistrict());

    return this.dutyRepository.save(duty1);
  }
}
