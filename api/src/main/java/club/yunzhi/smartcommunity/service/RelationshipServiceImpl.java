package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Relationship;
import club.yunzhi.smartcommunity.entity.ResidentRelationships;
import club.yunzhi.smartcommunity.repository.RelationshipRepository;
import club.yunzhi.smartcommunity.repository.ResidentRelationshipsRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class RelationshipServiceImpl implements RelationshipService {
  private final RelationshipRepository relationshipRepository;
  private final ResidentRelationshipsRepository residentRelationshipsRepository;

  public RelationshipServiceImpl(RelationshipRepository relationshipRepository, ResidentRelationshipsRepository residentRelationshipsRepository) {
    this.relationshipRepository = relationshipRepository;
    this.residentRelationshipsRepository = residentRelationshipsRepository;
  }

  @Override
  public List<Relationship> findAll() {
    return (List<Relationship>) this.relationshipRepository.findAll();
  }

  @Override
  public Relationship save(Relationship relationship) {
    Assert.notNull(relationship.getName(), "name can not be null");
    Assert.notNull(relationship.getWeight(), "weight can not be null");
    return this.relationshipRepository.save(relationship);
  }

  @Override
  public Page<Relationship> page(String name, Pageable pageable) {
    return this.relationshipRepository.getAll(name, pageable);
  }

  @Override
  public Relationship getById(Long id) {
    return this.relationshipRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("居民关系实体未找到"));
  }

  @Override
  public void delete(Long id) {
    Relationship relationship = this.getById(id);

    this.relationshipRepository.deleteById(relationship.getId());
  }

  @Override
  public Relationship getByResidentIds(Long oneRelationId, Long anotherRelationId) {
    Optional<ResidentRelationships> residentRelationships = this.residentRelationshipsRepository.findByOneResidentIdAndAnotherResidentId(oneRelationId, anotherRelationId);
    return residentRelationships.map(ResidentRelationships::getRelationship).orElse(null);
  }

  @Override
  public Relationship update(Long id, Relationship relationship) {
    Relationship relationship1 = getById(id);

    Assert.notNull(relationship.getName(), "name不能为空");
    Assert.notNull(relationship.getWeight(), "weight不能为空");

    relationship1.setName(relationship.getName());
    relationship1.setWeight(relationship.getWeight());
    return this.relationshipRepository.save(relationship1);
  }
}
