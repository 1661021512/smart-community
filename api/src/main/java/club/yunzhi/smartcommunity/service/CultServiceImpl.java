package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Cult;
import club.yunzhi.smartcommunity.repository.CultRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class CultServiceImpl implements CultService {
  private final Logger logger = LoggerFactory.getLogger(CultServiceImpl.class);
  private final CultRepository cultRepository;

  public CultServiceImpl(CultRepository cultRepository) {
    this.cultRepository = cultRepository;
  }

  @Override
  public List<Cult> findTop20ByNameContains(String name) {
    return this.cultRepository.findTop20ByNameContainsAndDeletedIsFalse(name);
  }

  @Override
  public Cult save(Cult cult) {
    Assert.notNull(cult.getName(), "name can not be null");
    String name = cult.getName().trim();
    Optional<Cult> optional = this.cultRepository.findByNameAndDeletedIsFalse(name);
    if (optional.isPresent()) {
      return optional.get();
    }

    Cult newCult = new Cult();
    newCult.setName(name);
    return this.cultRepository.save(newCult);
  }

  @Override
  public void updateLastUsedTime(Long id) {
    Assert.notNull(id, "id不能为空");

    Cult cult = cultRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("邪教实体未找到"));

    logger.debug("更新最近使用时间");
    cult.setLastUsedTime(new Timestamp(System.currentTimeMillis()));

    this.cultRepository.save(cult);
  }
}
