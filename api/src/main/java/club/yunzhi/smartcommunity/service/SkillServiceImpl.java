package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Skill;
import club.yunzhi.smartcommunity.repository.SkillRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class SkillServiceImpl implements SkillService {
  private final Logger logger = LoggerFactory.getLogger(SkillServiceImpl.class);
  private final SkillRepository skillRepository;

  public SkillServiceImpl(SkillRepository skillRepository) {
    this.skillRepository = skillRepository;
  }

  @Override
  public List<Skill> findTop20ByNameContains(String name) {
    return this.skillRepository.findTop20ByNameContainsAndDeletedIsFalse(name);
  }

  @Override
  public Skill save(Skill skill) {
    Assert.notNull(skill.getName(), "name can not be null");
    String name = skill.getName().trim();
    Optional<Skill> optional = this.skillRepository.findByNameAndDeletedIsFalse(name);
    if (optional.isPresent()) {
      return optional.get();
    }

    Skill newSkill = new Skill();
    newSkill.setName(name);
    return this.skillRepository.save(newSkill);
  }

  @Override
  public void updateLastUsedTime(Long id) {
    Assert.notNull(id, "id不能为空");

    Skill skill = skillRepository.findById(id).orElseThrow(() ->
        new EntityNotFoundException("技巧实体未找到"));

    logger.debug("更新最近使用时间");
    skill.setLastUsedTime(new Timestamp(System.currentTimeMillis()));

    this.skillRepository.save(skill);
  }
}
