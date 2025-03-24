package club.yunzhi.smartcommunity.entity;
import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.SQLDelete;
import javax.persistence.*;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Where;

import java.util.ArrayList;
import java.util.List;

/**
 * 物业公司
 */
@Entity
@SQLDelete(sql = "update `property_company` set deleted = 1 where id = ?")
public class PropertyCompany extends SoftDeleteEntity {

    @ApiModelProperty("物业公司名称")
    @Column(nullable = false)
    private String name = "";


    @ApiModelProperty("法人")
    @Column(nullable = false)
    private String legalPerson = "";

    @ApiModelProperty("联系人")
    @Column(nullable = false)
    private String contacts = "";

    @ApiModelProperty("联系电话")
    @Column(nullable = false)
    private String phone = "";

    @ApiModelProperty("负责小区")
    @OneToMany(mappedBy = "propertyCompany")
    @JsonView(VillageJsonView.class)
    @Where(clause = "deleted = false")
    private List<Village> villages = new ArrayList<>();

    @ApiModelProperty("综合评分")
    @Column(nullable = false)
    private Integer score = 0;

    @ApiModelProperty("综合评分排名")
    @Column(nullable = false)
    private Integer scoreRank = 1;

    @ApiModelProperty("及时响应率")
    @Column(nullable = false)
    private Integer timelyResponseRate = 0;

    @ApiModelProperty("备用联系人")
    private String alternateContact = "";

    @ApiModelProperty("备用联系电话")
    private String alternatePhone = "";

    @ApiModelProperty("公司地址")
    private String address = "";


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLegalPerson() {
        return legalPerson;
    }

    public void setLegalPerson(String legalPerson) {
        this.legalPerson = legalPerson;
    }

    public String getContacts() {
        return contacts;
    }

    public void setContacts(String contacts) {
        this.contacts = contacts;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Integer getTimelyResponseRate() {
        return timelyResponseRate;
    }

    public void setTimelyResponseRate(Integer timelyResponseRate) {
        this.timelyResponseRate = timelyResponseRate;
    }

    public String getAlternateContact() {
        return alternateContact;
    }

    public void setAlternateContact(String alternateContact) {
        this.alternateContact = alternateContact;
    }

    public String getAlternatePhone() {
        return alternatePhone;
    }

    public void setAlternatePhone(String alternatePhone) {
        this.alternatePhone = alternatePhone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<Village> getVillages() {
        return villages;
    }

    public void setVillages(List<Village> villages) {
        this.villages = villages;
    }

    public Integer getScoreRank() {
        return scoreRank;
    }

    public void setScoreRank(Integer scoreRank) {
        this.scoreRank = scoreRank;
    }

    public interface VillageJsonView {
    }

}
