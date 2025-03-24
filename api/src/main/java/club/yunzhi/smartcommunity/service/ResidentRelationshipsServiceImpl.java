package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Relationship;
import club.yunzhi.smartcommunity.entity.Resident;
import club.yunzhi.smartcommunity.entity.ResidentRelationships;
import club.yunzhi.smartcommunity.repository.ResidentRelationshipsRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Service
public class ResidentRelationshipsServiceImpl implements ResidentRelationshipsService {

  private final ResidentRelationshipsRepository residentRelationshipsRepository;

  public ResidentRelationshipsServiceImpl(ResidentRelationshipsRepository residentRelationshipsRepository) {
    this.residentRelationshipsRepository = residentRelationshipsRepository;
  }

  @Override
  public List<ResidentRelationships> getFromAllByResidentId(Long residentId) {
    return this.residentRelationshipsRepository.findAllByOneResidentId(residentId);
  }

  @Override
  public ResidentRelationships save(ResidentRelationships residentRelationships) {
    Assert.notNull(residentRelationships.getOneResident(), "居民不能为null");
    Assert.notNull(residentRelationships.getAnotherResident(), "另一居民不能为null");
    Assert.notNull(residentRelationships.getRelationship(), "关系不能为NULL");
    Assert.notNull(residentRelationships.getOneResident().getId(), "居民ID不能为NULL");
    Assert.notNull(residentRelationships.getAnotherResident().getId(), "居民ID不能为NULL");
    Assert.notNull(residentRelationships.getRelationship().getId(), "关系ID不能为NULL");
    return this.residentRelationshipsRepository.save(residentRelationships);
  }

  @Override
  public void updateBetweenTwoResidents(Long relationshipId, Long oneResidentId, Long anotherResidentId) {
    Assert.notNull(relationshipId, "relationshipId can not be null");
    Assert.notNull(oneResidentId, "oneResidentId can not be null");
    Assert.notNull(anotherResidentId, "anotherResidentId can not be null");

    Optional<ResidentRelationships> optional =
        this.residentRelationshipsRepository.findByOneResidentIdAndAnotherResidentId(oneResidentId, anotherResidentId);
    if (optional.isPresent()) {
      // 如果两者的关系存在，且原关系与新关系相同，则直接返回
      if (optional.get().getRelationship().getId().equals(relationshipId)) {
        return;
      }
      this.residentRelationshipsRepository.delete(optional.get());
    }

    Relationship relationship = new Relationship();
    relationship.setId(relationshipId);
    Resident oneResident = new Resident();
    oneResident.setId(oneResidentId);
    Resident anotherResident = new Resident();
    anotherResident.setId(anotherResidentId);
    ResidentRelationships residentRelationships = new ResidentRelationships();
    residentRelationships.setRelationship(relationship);
    residentRelationships.setOneResident(oneResident);
    residentRelationships.setAnotherResident(anotherResident);
    this.residentRelationshipsRepository.save(residentRelationships);

    // 再更新对端
    this.updateBetweenTwoResidents(relationshipId, anotherResidentId, oneResidentId);
  }
}
