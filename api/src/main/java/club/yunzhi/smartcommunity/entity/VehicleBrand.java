package club.yunzhi.smartcommunity.entity;

import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.util.ArrayList;
import java.util.List;

/**
 * 车辆品牌
 */
@Entity
@SQLDelete(sql = "update `vehicle_brand` set deleted = 1 where id = ?")
public class VehicleBrand extends SoftDeleteEntity {
    @ApiModelProperty("车辆品牌名称")
    @Column(nullable = false)
    private String name = "";

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
