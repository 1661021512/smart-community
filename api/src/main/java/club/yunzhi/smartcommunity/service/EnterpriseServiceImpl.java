package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Enterprise;
import club.yunzhi.smartcommunity.repository.EnterpriseRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Service
public class EnterpriseServiceImpl implements EnterpriseService {
  private final EnterpriseRepository enterpriseRepository;

  public EnterpriseServiceImpl(EnterpriseRepository enterpriseRepository) {
    this.enterpriseRepository = enterpriseRepository;
  }

  @Override
  public List<Enterprise> findTop20ByNameContains(String name) {
    return this.enterpriseRepository.findTop20ByNameContainsAndDeletedIsFalse(name);
  }

  @Override
  public Enterprise save(Enterprise enterprise) {
    Assert.notNull(enterprise.getName(), "name can not be null");
    String name = enterprise.getName().trim();
    Optional<Enterprise> optional = this.enterpriseRepository.findByNameAndDeletedIsFalse(name);
    if (optional.isPresent()) {
      return optional.get();
    }

    Enterprise newEnterprise = new Enterprise();
    newEnterprise.setName(name);
    return this.enterpriseRepository.save(newEnterprise);
  }
}
