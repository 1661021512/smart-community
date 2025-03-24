package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Skill;

import java.util.List;

public interface SkillService {
  List<Skill> findTop20ByNameContains(String name);

  Skill save(Skill skill);

  /**
   * 更新最后一次使用时间
   *
   * @param id
   */
  void updateLastUsedTime(Long id);
}
