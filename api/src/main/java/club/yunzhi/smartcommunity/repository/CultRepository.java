package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.Cult;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

public interface CultRepository extends PagingAndSortingRepository<Cult, Long> {
  List<Cult> findTop20ByNameContainsAndDeletedIsFalse(String name);

  Optional<Cult> findByNameAndDeletedIsFalse(String name);
}
