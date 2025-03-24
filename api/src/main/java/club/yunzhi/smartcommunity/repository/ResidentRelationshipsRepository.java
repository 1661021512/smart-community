package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.ResidentRelationships;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface ResidentRelationshipsRepository extends CrudRepository<ResidentRelationships, Long> {

  List<ResidentRelationships> findAllByOneResidentId(Long residentId);

  Optional<ResidentRelationships> findByOneResidentIdAndAnotherResidentId(Long oneResidentId, Long anotherResidentId);
}
