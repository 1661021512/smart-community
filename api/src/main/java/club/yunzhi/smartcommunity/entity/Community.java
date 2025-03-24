package club.yunzhi.smartcommunity.entity;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.SQLDelete;
;

import javax.persistence.*;
import java.util.List;

import static club.yunzhi.smartcommunity.entity.District.TYPE_COMMUNITY;

/**
 * 社区实体类
 */
@Entity
@SQLDelete(sql = "update `district` set deleted = 1 where id = ?")
@DiscriminatorValue(TYPE_COMMUNITY)
public class Community extends District {
  @JsonView(VillagesJsonView.class)
  public List<District> getVillages() {
    return this.getChildren();
  }

  public void setVillages(List<District> villages) {
    this.setChildren(villages);
  }

  @JsonView(TownJsonView.class)
  public District getTown() {
    return this.getParent();
  }

  public void setTown(District town) {
    this.setParent(town);
  }

  public Community() {
    this.setType(District.TYPE_COMMUNITY);
  }

  public interface VillagesJsonView {
  }

  public interface TownJsonView {
  }
}
