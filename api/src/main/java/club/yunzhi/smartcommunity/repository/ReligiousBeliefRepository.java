package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.ReligiousBelief;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

/**
 * 宗教信仰
 */
public interface ReligiousBeliefRepository extends CrudRepository<ReligiousBelief, Long> {

  List<ReligiousBelief> findTop20ByNameContainsAndDeletedIsFalse(String name);

  Optional<ReligiousBelief> findByNameAndDeletedIsFalse(String name);

}
