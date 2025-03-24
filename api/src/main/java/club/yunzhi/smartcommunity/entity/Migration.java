package club.yunzhi.smartcommunity.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import java.io.Serializable;

/**
 * 数据迁移实体
 * 用来控制初始化数据
 *
 * @author panjie
 */
@Entity
@ApiModel(value = "Migration 数据版本", description = "用于进行版本更新时数据初始化")
public class Migration implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ApiModelProperty("版本号")
    @Column(unique = true)
    private String batch;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBatch() {
        return batch;
    }

    public void setBatch(String batch) {
        this.batch = batch;
    }

    public Migration() {
    }

    public Migration(String batch) {
        this.batch = batch;
    }
}
