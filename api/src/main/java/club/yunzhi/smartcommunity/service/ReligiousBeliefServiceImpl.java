package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.ReligiousBelief;
import club.yunzhi.smartcommunity.repository.ReligiousBeliefRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Service
public class ReligiousBeliefServiceImpl implements ReligiousBeliefService {

  private final ReligiousBeliefRepository religiousBeliefRepository;

  public ReligiousBeliefServiceImpl(ReligiousBeliefRepository religiousBeliefRepository) {
    this.religiousBeliefRepository = religiousBeliefRepository;
  }


  @Override
  public List<ReligiousBelief> findTop20ByNameContains(String name) {
    return this.religiousBeliefRepository.findTop20ByNameContainsAndDeletedIsFalse(name);
  }

  @Override
  public ReligiousBelief save(ReligiousBelief religiousBelief) {
    Assert.notNull(religiousBelief.getName(), "name can not be null");
    String name = religiousBelief.getName().trim();
    Optional<ReligiousBelief> optional = this.religiousBeliefRepository.findByNameAndDeletedIsFalse(name);
    if (optional.isPresent()) {
      return optional.get();
    }

    ReligiousBelief newReligiousBelief = new ReligiousBelief();
    newReligiousBelief.setName(name);
    return this.religiousBeliefRepository.save(newReligiousBelief);
  }
}
