package club.yunzhi.smartcommunity.entity;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.SQLDelete;
;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import java.util.List;

import static club.yunzhi.smartcommunity.entity.District.TYPE_TOWN;

/**
 * 乡镇实体
 */
@Entity
@SQLDelete(sql = "update `district` set deleted = 1 where id = ?")
@DiscriminatorValue(TYPE_TOWN)
public class Town extends District {
  public Town() {
    this.setType(District.TYPE_TOWN);
  }

  @JsonView(CommunitiesJsonView.class)
  public List<District> getCommunities() {
    return this.getChildren();
  }

  public void setCommunities(List<District> communities) {
    this.setChildren(communities);
  }

  @JsonView(CountyJsonView.class)
  public District getCounty() {
    return this.getParent();
  }

  public void setCounty(District county) {
    this.setParent(county);
  }

  public interface CommunitiesJsonView {
  }

  public interface CountyJsonView {
  }
}