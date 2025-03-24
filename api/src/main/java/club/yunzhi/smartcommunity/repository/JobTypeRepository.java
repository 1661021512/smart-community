package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.JobType;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface JobTypeRepository extends CrudRepository<JobType, Long> {
  List<JobType> findTop20ByNameContainsAndDeletedIsFalse(String name);

  Optional<JobType> findByNameAndDeletedIsFalse(String name);
}
