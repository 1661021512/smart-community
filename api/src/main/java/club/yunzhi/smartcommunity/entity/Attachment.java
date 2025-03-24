package club.yunzhi.smartcommunity.entity;

import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 * 附件实体.
 */
@Entity
public class Attachment extends BaseEntity {
  /** 附件原始名称 */
  private String name;

  @ManyToOne
  @JoinColumn(nullable = false)
  @JsonView(MyFileJsonView.class)
  private MyFile file;

  /** 附件扩展名 */
  private String ext;

  public Attachment() {
  }

  public Attachment(Long id) {
    this.id = id;
  }

  @Override
  public Long getId() {
    return id;
  }

  @Override
  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public MyFile getFile() {
    return file;
  }

  public void setFile(MyFile file) {
    this.file = file;
  }

  public String getExt() {
    return ext;
  }

  public void setExt(String ext) {
    this.ext = ext;
  }

  public interface MyFileJsonView {
  }

  public interface WorkJsonView {
  }


}
