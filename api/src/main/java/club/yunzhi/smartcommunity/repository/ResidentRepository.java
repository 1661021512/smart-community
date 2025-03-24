package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.Resident;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface ResidentRepository extends PagingAndSortingRepository<Resident, Long>, JpaSpecificationExecutor<Resident> {

  Long countAllByCreateUserIdAndDeletedIsFalse(Long createUserId);

  Optional<Resident> findByIdNumberAndDeletedIsFalse(String idNumber);
}
