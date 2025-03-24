package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.Enterprise;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

public interface EnterpriseRepository extends PagingAndSortingRepository<Enterprise, Long> {
  List<Enterprise> findTop20ByNameContainsAndDeletedIsFalse(String name);

  Optional<Enterprise> findByNameAndDeletedIsFalse(String name);
}
