package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.Skill;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

public interface SkillRepository extends PagingAndSortingRepository<Skill, Long> {

  Optional<Skill> findByNameAndDeletedIsFalse(String name);

  List<Skill> findTop20ByNameContainsAndDeletedIsFalse(String name);
}
