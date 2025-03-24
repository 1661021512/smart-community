package club.yunzhi.smartcommunity.entity;

import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;

/**
 * 居民间关系
 * 不启用软删除
 */
@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"one_resident_id", "another_resident_id"}))
public class ResidentRelationships extends BaseEntity {

  @ManyToOne
  @JoinColumn(nullable = false)
  @JsonView(OneResidentJsonView.class)
  private Resident oneResident;

  @ManyToOne
  @JoinColumn(nullable = false)
  @JsonView(AnotherResidentJsonView.class)
  private Resident anotherResident;

  @ManyToOne
  @JoinColumn(nullable = false)
  @JsonView(RelationshipJsonView.class)
  private Relationship relationship;

  public Resident getOneResident() {
    return oneResident;
  }

  public void setOneResident(Resident oneResident) {
    this.oneResident = oneResident;
  }

  public Resident getAnotherResident() {
    return anotherResident;
  }

  public void setAnotherResident(Resident otherResident) {
    this.anotherResident = otherResident;
  }

  public Relationship getRelationship() {
    return relationship;
  }

  public void setRelationship(Relationship relationship) {
    this.relationship = relationship;
  }

  public interface OneResidentJsonView {
  }

  public interface AnotherResidentJsonView {
  }

  public interface RelationshipJsonView {
  }
}
