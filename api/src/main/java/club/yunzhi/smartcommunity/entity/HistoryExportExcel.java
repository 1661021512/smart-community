package club.yunzhi.smartcommunity.entity;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.SQLDelete;
import org.springframework.util.Assert;

import javax.persistence.Entity;
import javax.persistence.Transient;

/**
 * @author xiaoqiang
 * 导出excel实体
 */
@Entity
@SQLDelete(sql = "update `history_export_excel` set deleted = 1 where id = ?")
public class HistoryExportExcel extends SoftDeleteEntity {

    /**
     * 等待导出
     */
    public static short STATUS_WAIT_EXPORT = 0;

    /**
     * 正在导出
     */
    public static short STATUS_EXPORTING = 1;

    /**
     * 已导出
     */
    public static short STATUS_EXPORTED = 2;

    public HistoryExportExcel() {
    }

    public HistoryExportExcel(String name,
                       String phone,
                       String idNumber,
                       String workPlace,
                       Short politicalClimate,
                       Short education,
                       String religion,
                       Long districtId,
                       Integer beginAge,
                       Integer endAge,
                       Short nationality,
                       Boolean sex,
                       Boolean beVaccinated) {
        this.name = name;
        this.phone = phone;
        this.idNumber = idNumber;
        this.workPlace = workPlace;
        this.politicalClimate = politicalClimate;
        this.education = education;
        this.religion = religion;
        this.districtId = districtId;
        this.beginAge = beginAge;
        this.endAge = endAge;
        this.nationality = nationality;
        this.sex = sex;
        this.beVaccinated = beVaccinated;
    }

    /**
     * 文件名
     */
    private String filename;

    /**
     * 作为导出时权限判断使用，暂时不用保存到数据库中
     */
    @Transient
    private WebUser webUser;

    private short status = STATUS_WAIT_EXPORT;

    // 以下属性为查询条件
    @JsonView(QueryParametersJsonView.class)
    private String name;

    @JsonView(QueryParametersJsonView.class)
    private String phone;

    @JsonView(QueryParametersJsonView.class)
    private String idNumber;

    @JsonView(QueryParametersJsonView.class)
    private String workPlace;

    @JsonView(QueryParametersJsonView.class)
    private Short politicalClimate;

    @JsonView(QueryParametersJsonView.class)
    private Short education;

    @JsonView(QueryParametersJsonView.class)
    private String religion;

    @JsonView(QueryParametersJsonView.class)
    private Long districtId;

    @JsonView(QueryParametersJsonView.class)
    private Integer beginAge;

    @JsonView(QueryParametersJsonView.class)
    private Integer endAge;

    @JsonView(QueryParametersJsonView.class)
    private Short nationality;

    @JsonView(QueryParametersJsonView.class)
    private Boolean sex;

    @JsonView(QueryParametersJsonView.class)
    private Boolean beVaccinated;

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public WebUser getWebUser() {
        return webUser;
    }

    public void setWebUser(WebUser webUser) {
        this.webUser = webUser;
    }

    public short getStatus() {
        return status;
    }

    public void setStatus(short status) {
        Assert.isTrue(status <= STATUS_EXPORTED, "状态应该在0-1之间");
        Assert.isTrue(status >= STATUS_WAIT_EXPORT, "状态应该在0-1之间");
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public String getWorkPlace() {
        return workPlace;
    }

    public void setWorkPlace(String workPlace) {
        this.workPlace = workPlace;
    }

    public Short getPoliticalClimate() {
        return politicalClimate;
    }

    public void setPoliticalClimate(Short politicalClimate) {
        this.politicalClimate = politicalClimate;
    }

    public Short getEducation() {
        return education;
    }

    public void setEducation(Short education) {
        this.education = education;
    }

    public String getReligion() {
        return religion;
    }

    public void setReligion(String religion) {
        this.religion = religion;
    }

    public Long getDistrictId() {
        return districtId;
    }

    public void setDistrictId(Long districtId) {
        this.districtId = districtId;
    }

    public Integer getBeginAge() {
        return beginAge;
    }

    public void setBeginAge(Integer beginAge) {
        this.beginAge = beginAge;
    }

    public Integer getEndAge() {
        return endAge;
    }

    public void setEndAge(Integer endAge) {
        this.endAge = endAge;
    }

    public Short getNationality() {
        return nationality;
    }

    public void setNationality(Short nationality) {
        this.nationality = nationality;
    }

    public Boolean getSex() {
        return sex;
    }

    public void setSex(Boolean sex) {
        this.sex = sex;
    }

    public Boolean getBeVaccinated() {
        return beVaccinated;
    }

    public void setBeVaccinated(Boolean beVaccinated) {
        this.beVaccinated = beVaccinated;
    }

    public interface QueryParametersJsonView {
    }
}
