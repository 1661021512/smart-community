package club.yunzhi.smartcommunity.entity;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@SQLDelete(sql = "update `district` set deleted = 1 where id = ?")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type",
    discriminatorType = DiscriminatorType.STRING,
    length = 10)
public class District extends SoftDeleteEntity {
  public static final String TYPE_COUNTY = "county";
  public static final String TYPE_TOWN = "town";
  public static final String TYPE_COMMUNITY = "community";
  public static final String TYPE_VILLAGE = "village";
  public static final String TYPE_BUILDING = "building";

  /**
   * 名称
   */
  @Column(nullable = false)
  private String name = "";

  @OneToMany(mappedBy = "parent")
  @Where(clause = "deleted = false")
  @JsonView(ChildrenJsonView.class)
  private List<District> children = new ArrayList<>();

  @ManyToOne
  @NotFound
  @JsonView(ParentJsonView.class)
  private District parent;

  @ManyToOne
  @NotFound
  @JsonView(GeoJsonJsonView.class)
  private Attachment geoJson;

  @ManyToOne
  @NotFound
  @JsonView(GeoJsonJsonView.class)
  private Attachment secondaryGeoJson;

  @Column(insertable = false, updatable = false)
  String type;

  public String getType() {
    return type;
  }

  protected void setType(String type) {
    this.type = type;
  }

  /**
   * 拼音
   */
  private String pinyin;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public List<District> getChildren() {
    return children;
  }

  public void setChildren(List<District> children) {
    this.children = children;
  }

  public District getParent() {
    return parent;
  }

  public void setParent(District parent) {
    this.parent = parent;
  }

  public String getPinyin() {
    return pinyin;
  }

  public Attachment getSecondaryGeoJson() {
    return secondaryGeoJson;
  }

  public void setSecondaryGeoJson(Attachment secondaryGeoJson) {
    this.secondaryGeoJson = secondaryGeoJson;
  }

  public void setPinyin(String pinyin) {
    this.pinyin = pinyin;
  }

  public Attachment getGeoJson() {
    return geoJson;
  }

  public void setGeoJson(Attachment geoJson) {
    this.geoJson = geoJson;
  }

  interface ChildrenJsonView {
  }

  public interface ParentJsonView {
  }

  public interface GeoJsonJsonView {
  }
}
