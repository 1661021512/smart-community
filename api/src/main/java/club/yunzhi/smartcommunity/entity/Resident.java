package club.yunzhi.smartcommunity.entity;

import club.yunzhi.smartcommunity.service.ResidentService;
import club.yunzhi.smartcommunity.util.IdCardUtil;
import club.yunzhi.smartcommunity.util.SMSUtils;
import com.fasterxml.jackson.annotation.JsonView;
import com.mengyunzhi.core.exception.ValidationException;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
;

import javax.persistence.*;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * 居民实体
 */
@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"idNumber", "deleteAt"}))
@SQLDelete(sql = "update `resident` set deleted = 1, delete_at = UNIX_TIMESTAMP() where id = ?")
public class Resident extends SoftDeleteEntity {
  public static final String TABLE_NAME = "resident";
  /**
   * 党员
   */
  public static final Short POLITICAL_CLIMATE_PARTY = 1;
  /**
   * 群众
   */
  public static final Short POLITICAL_CLIMATE_MASSES = 0;

  /**
   * 户编号
   */
  private String accountNumber;

  /**
   * 是否有慢性病
   */
  private Boolean beChronicDisease;

  /**
   * 是否矫正人员
   */
  private Boolean beCrimed;

  /**
   * 是否参加了邪教组织
   */
  private Boolean beCultMember;

  /**
   * 是否残疾人
   */
  private Boolean beDisabled;

  /**
   * 是否兵残
   */
  private Boolean beDisabledSolider;

  /**
   * 是否空巢
   */
  private Boolean beEmptyNest;

  /**
   * 是否养老保险
   */
  private Boolean beEndowmentInsurance;

  /**
   * 是否参战
   */
  private Boolean beEnterToWar;

  /**
   * 是否流动人口
   */
  private Boolean beFloating;

  /**
   * 是否留守儿童
   */
  private Boolean beLeftBehindChildren;

  /**
   * 是否信仿人员
   */
  private Boolean beLetterImitationPeople;

  /**
   * 是否孤寡
   */
  private Boolean beLonelyOrWidowed;

  /**
   * 是否医保
   */
  private Boolean beMedicalInsurance;

  /**
   * 是否涉核
   */
  private Boolean beNuclear;

  /**
   * 是否高龄补贴
   */
  private Boolean beOldAgeAllowance;

  /**
   * 是否复原军人
   */
  private Boolean beSoldier;

  /**
   * 是否在校生
   */
  private Boolean beStudent;

  /**
   * 是否低保
   */
  private Boolean beSubsistenceAllowances;

  /**
   * 是否志愿兵
   */
  private Boolean beVolunteer;

  /**
   * 慢性病描述
   */
  private String chronicDiseaseDetails;

  /**
   * 矫正类型
   */
  @ManyToMany
  @Where(clause = "deleted = false")
  @JoinTable(name = CrimedType.TABLE_NAME + "_" + Resident.TABLE_NAME,
      joinColumns = @JoinColumn(name = Resident.TABLE_NAME + "_id"),
      inverseJoinColumns = @JoinColumn(name = CrimedType.TABLE_NAME + "_id"))
  @JsonView(CrimedTypeJsonView.class)
  private List<CrimedType> crimedTypes = new ArrayList<>();

  /**
   * 加入的邪教组织名称
   */
  @ManyToOne
  @NotFound
  @JsonView(CultJsonView.class)
  private Cult cult;

  /**
   * 工作单位
   */
  @OneToOne
  @NotFound
  @JsonView(EnterpriseJsonView.class)
  private Enterprise enterprise;

  /**
   * 出生日期
   */
  private Timestamp dateOfBirth;

  /**
   * 户籍地
   */
  private String domicilePlace;

  /**
   * 教育程度
   */
  private Short education;

  /**
   * 就业状况
   */
  private Short employmentStatus;

  /**
   * 流入流出日期
   */
  private Timestamp floatedDate;

  /**
   * 流入流出地
   */
  private String floatedPlace;

  /**
   * 住房信息
   */
  @ManyToMany
  @Where(clause = "deleted = false")
  @JoinTable(name = House.TABLE_NAME + "_" + Resident.TABLE_NAME,
      joinColumns = @JoinColumn(name = Resident.TABLE_NAME + "_id"),
      inverseJoinColumns = @JoinColumn(name = House.TABLE_NAME + "_id"))
  @JsonView(HouseJsonView.class)
  private List<House> houses = new ArrayList<>();

  /**
   * 身份证号码
   */
  @Column(nullable = false)
  @JsonView(IdNumberJsonView.class)
  private String idNumber;

  /**
   * 信仿内容
   */
  private String letterImitationContent;

  /**
   * 是否本地户籍
   */
  private Boolean localDomicile;

  /**
   * 婚姻状况
   */
  private Short maritalStatus;

  /**
   * 姓名
   */
  private String name;

  /**
   * 民族
   */
  private Short nationality;

  /**
   * 电话号码
   */
  @JsonView(PhoneJsonView.class)
  private String phone;

  @ApiModelProperty("政治面貌:0, 群众；1，党员")
  private Short politicalClimate;

  /**
   * 宗教
   */
  private String religion;

  /**
   * 宗教信仰
   */
  @ManyToOne
  @NotFound
  @JsonView(ReligiousBeliefJsonView.class)
  private ReligiousBelief religiousBelief;

  /**
   * 备注
   */
  private String remarks;

  /**
   * 学校名称
   */
  private String school;

  /**
   * 学校地址
   */
  private String schoolAddress;

  /**
   * 性别
   */
  private Boolean sex;

  /**
   * 务工地点
   */
  private String workPlace;

  /**
   * 是否接种疫苗
   */
  private Boolean beVaccinated = false;

  /**
   * 接种疫苗地点
   */
  private String vaccinatedPlace;

  /**
   * 未接种疫苗原因
   */
  private String notVaccinatedReason;

  /**
   * 技能
   */
  @ManyToMany
  @Where(clause = "deleted = false")
  @JsonView(SkillJsonView.class)
  @JoinTable(name = Resident.TABLE_NAME + "_" + Skill.TABLE_NAME,
      joinColumns = @JoinColumn(name = Resident.TABLE_NAME + "_id"),
      inverseJoinColumns = @JoinColumn(name = Skill.TABLE_NAME + "_id"))
  private List<Skill> skills = new ArrayList<>();

  /**
   * 求职意向
   */
  @ManyToMany
  @Where(clause = "deleted = false")
  @JsonView(JobTypeJsonView.class)
  @JoinTable(name = JobType.TABLE_NAME + "_" + Resident.TABLE_NAME,
      joinColumns = @JoinColumn(name = Resident.TABLE_NAME + "_id"),
      inverseJoinColumns = @JoinColumn(name = JobType.TABLE_NAME + "_id"))
  private List<JobType> jobTypeRequirements = new ArrayList<>();

  public String getAccountNumber() {
    return accountNumber;
  }

  public void setAccountNumber(String accountNumber) {
    this.accountNumber = accountNumber;
  }

  public Boolean getBeChronicDisease() {
    return beChronicDisease;
  }

  public void setBeChronicDisease(Boolean beChronicDisease) {
    this.beChronicDisease = beChronicDisease;
  }

  public Boolean getBeCrimed() {
    return beCrimed;
  }

  public void setBeCrimed(Boolean beCrimed) {
    this.beCrimed = beCrimed;
  }

  public Boolean getBeCultMember() {
    return beCultMember;
  }

  public void setBeCultMember(Boolean beCultMember) {
    this.beCultMember = beCultMember;
  }

  public Cult getCult() {
    return cult;
  }

  public void setCult(Cult cult) {
    this.cult = cult;
  }

  public Boolean getBeDisabled() {
    return beDisabled;
  }

  public void setBeDisabled(Boolean beDisabled) {
    this.beDisabled = beDisabled;
  }

  public Boolean getBeDisabledSolider() {
    return beDisabledSolider;
  }

  public void setBeDisabledSolider(Boolean beDisabledSolider) {
    this.beDisabledSolider = beDisabledSolider;
  }

  public Boolean getBeEmptyNest() {
    return beEmptyNest;
  }

  public void setBeEmptyNest(Boolean beEmptyNest) {
    this.beEmptyNest = beEmptyNest;
  }

  public Boolean getBeEndowmentInsurance() {
    return beEndowmentInsurance;
  }

  public void setBeEndowmentInsurance(Boolean beEndowmentInsurance) {
    this.beEndowmentInsurance = beEndowmentInsurance;
  }

  public Boolean getBeEnterToWar() {
    return beEnterToWar;
  }

  public void setBeEnterToWar(Boolean beEnterToWar) {
    this.beEnterToWar = beEnterToWar;
  }

  public Boolean getBeFloating() {
    return beFloating;
  }

  public void setBeFloating(Boolean beFloating) {
    this.beFloating = beFloating;
  }

  public Boolean getBeLeftBehindChildren() {
    return beLeftBehindChildren;
  }

  public void setBeLeftBehindChildren(Boolean beLeftBehindChildren) {
    this.beLeftBehindChildren = beLeftBehindChildren;
  }

  public Boolean getBeLetterImitationPeople() {
    return beLetterImitationPeople;
  }

  public void setBeLetterImitationPeople(Boolean beLetterImitationPeople) {
    this.beLetterImitationPeople = beLetterImitationPeople;
  }

  public Boolean getBeLonelyOrWidowed() {
    return beLonelyOrWidowed;
  }

  public void setBeLonelyOrWidowed(Boolean beLonelyOrWidowed) {
    this.beLonelyOrWidowed = beLonelyOrWidowed;
  }

  public Boolean getBeMedicalInsurance() {
    return beMedicalInsurance;
  }

  public void setBeMedicalInsurance(Boolean beMedicalInsurance) {
    this.beMedicalInsurance = beMedicalInsurance;
  }

  public Boolean getBeNuclear() {
    return beNuclear;
  }

  public void setBeNuclear(Boolean beNuclear) {
    this.beNuclear = beNuclear;
  }

  public Boolean getBeOldAgeAllowance() {
    return beOldAgeAllowance;
  }

  public void setBeOldAgeAllowance(Boolean beOldAgeAllowance) {
    this.beOldAgeAllowance = beOldAgeAllowance;
  }

  public Boolean getBeSoldier() {
    return beSoldier;
  }

  public void setBeSoldier(Boolean beSoldier) {
    this.beSoldier = beSoldier;
  }

  public Boolean getBeStudent() {
    return beStudent;
  }

  public void setBeStudent(Boolean beStudent) {
    this.beStudent = beStudent;
  }

  public Boolean getBeSubsistenceAllowances() {
    return beSubsistenceAllowances;
  }

  public void setBeSubsistenceAllowances(Boolean beSubsistenceAllowances) {
    this.beSubsistenceAllowances = beSubsistenceAllowances;
  }

  public Boolean getBeVolunteer() {
    return beVolunteer;
  }

  public void setBeVolunteer(Boolean beVolunteer) {
    this.beVolunteer = beVolunteer;
  }

  public String getChronicDiseaseDetails() {
    return chronicDiseaseDetails;
  }

  public void setChronicDiseaseDetails(String chronicDiseaseDetails) {
    this.chronicDiseaseDetails = chronicDiseaseDetails;
  }

  public Timestamp getDateOfBirth() {
    return dateOfBirth;
  }

  protected void setDateOfBirth(Timestamp dateOfBirth) {
    if (dateOfBirth != null) {
      Calendar time = Calendar.getInstance();
      time.setTimeInMillis(dateOfBirth.getTime());
      time.set(Calendar.HOUR, 12);
      dateOfBirth = new Timestamp(time.getTimeInMillis());
    }
    this.dateOfBirth = dateOfBirth;
  }

  public String getDomicilePlace() {
    return domicilePlace;
  }

  public void setDomicilePlace(String domicilePlace) {
    this.domicilePlace = domicilePlace;
  }

  public Short getEducation() {
    return education;
  }

  public void setEducation(Short education) {
    this.education = education;
  }

  public Short getEmploymentStatus() {
    return employmentStatus;
  }

  public void setEmploymentStatus(Short employmentStatus) {
    this.employmentStatus = employmentStatus;
  }

  public Timestamp getFloatedDate() {
    return floatedDate;
  }

  public void setFloatedDate(Timestamp floatedDate) {
    this.floatedDate = floatedDate;
  }

  public String getFloatedPlace() {
    return floatedPlace;
  }

  public void setFloatedPlace(String floatedPlace) {
    this.floatedPlace = floatedPlace;
  }

  public List<House> getHouses() {
    return houses;
  }

  public void setHouses(List<House> houses) {
    this.houses = houses;
  }

  public void addHouse(House house) {
    houses.add(house);
    house.getResidents().add(this);
  }

  public void removeHouse(House house) {
    houses.remove(house);
    house.getResidents().remove(this);
  }

  public int getAge() {
    Calendar calendar = Calendar.getInstance();
    Calendar birth = Calendar.getInstance();
    birth.setTimeInMillis(this.dateOfBirth.getTime());
    int age = calendar.get(Calendar.YEAR) - birth.get(Calendar.YEAR);
    if (calendar.get(Calendar.MONTH) < birth.get(Calendar.MONTH) ||
        (calendar.get(Calendar.MONTH) == birth.get(Calendar.MONTH) && calendar.get(Calendar.DATE) <= birth.get(Calendar.DATE))) {
      age--;
    }
    return age;
  }

  public String getIdNumber() {
    return idNumber;
  }

  public void setIdNumber(String idNumber) {
        if (!IdCardUtil.isValidCard(idNumber)) {
          throw new ValidationException("身份证格式不正确" + idNumber);
        }
    this.idNumber = idNumber;

    this.setDateOfBirth(getTimeStampFormIdNumber(idNumber));

    Short idNumberSeventeenth = Short.valueOf(this.idNumber.substring(16, 17));
    Boolean sex = idNumberSeventeenth % 2 != 0;
    this.setSex(sex);
  }

  public String getLetterImitationContent() {
    return letterImitationContent;
  }

  public void setLetterImitationContent(String letterImitationContent) {
    this.letterImitationContent = letterImitationContent;
  }

  public Boolean getLocalDomicile() {
    return localDomicile;
  }

  public void setLocalDomicile(Boolean localDomicile) {
    this.localDomicile = localDomicile;
  }

  public Short getMaritalStatus() {
    return maritalStatus;
  }

  @JsonView(MaritalStatusNameJsonView.class)
  public String getMaritalStatusName() {
    String[] maritals = new String[]{
        "已婚",
        "未婚",
        "离异",
        "丧偶"
    };
    int index = this.getMaritalStatus();
    if (index < 0 || index >= maritals.length) {
      return "";
    } else {
      return maritals[index];
    }
  }

  public void setMaritalStatus(Short maritalStatus) {
    this.maritalStatus = maritalStatus;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Short getNationality() {
    return nationality;
  }

  public void setNationality(Short nationality) {
    this.nationality = nationality;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    if (!SMSUtils.isMobile(phone)) {
      throw new ValidationException("手机号格式不正确" + phone);
    }
    this.phone = phone;
  }

  public Short getPoliticalClimate() {
    return politicalClimate;
  }

  public void setPoliticalClimate(Short politicalClimate) {
    this.politicalClimate = politicalClimate;
  }

  public ReligiousBelief getReligiousBelief() {
    return religiousBelief;
  }

  public void setReligiousBelief(ReligiousBelief religiousBelief) {
    this.religiousBelief = religiousBelief;
  }

  public String getRemarks() {
    return remarks;
  }

  /**
   * 获取加密后的身份证号
   */
  public String getEncodedIdNumber() {
    return ResidentService.idNumberEncode(this.getIdNumber());
  }

  /**
   * 获取加密后的电话号
   */
  public String getEncodedPhone() {
    return ResidentService.phoneEncode(this.getPhone());
  }

  public void setRemarks(String remarks) {
    this.remarks = remarks;
  }

  public String getSchool() {
    return school;
  }

  public void setSchool(String school) {
    this.school = school;
  }

  public String getSchoolAddress() {
    return schoolAddress;
  }

  public void setSchoolAddress(String schoolAddress) {
    this.schoolAddress = schoolAddress;
  }

  public Boolean getSex() {
    return sex;
  }

  public void setSex(Boolean sex) {
    this.sex = sex;
  }

  public String getWorkPlace() {
    return workPlace;
  }

  public void setWorkPlace(String workPlace) {
    this.workPlace = workPlace;
  }

  public Enterprise getEnterprise() {
    return enterprise;
  }

  public void setEnterprise(Enterprise enterprise) {
    this.enterprise = enterprise;
  }

  public List<JobType> getJobTypeRequirements() {
    return jobTypeRequirements;
  }

  public void setJobTypeRequirements(List<JobType> jobTypeRequirements) {
    this.jobTypeRequirements = jobTypeRequirements;
  }

  public List<Skill> getSkills() {
    return skills;
  }

  public void setSkills(List<Skill> skills) {
    this.skills = skills;
  }

  public List<CrimedType> getCrimedTypes() {
    return crimedTypes;
  }

  public void setCrimedTypes(List<CrimedType> crimedTypes) {
    this.crimedTypes = crimedTypes;
  }

  private static final String shortDateFormat = "yyyy-MM-dd";

  public static Date convert(String source) {
    source = source.trim();
    try {
      SimpleDateFormat formatter;
      formatter = new SimpleDateFormat(shortDateFormat);
      Date dtDate = formatter.parse(source);
      return dtDate;
    } catch (Exception e) {
      throw new RuntimeException(String.format("parser %s to Date fail", source));
    }
  }

  public static Timestamp getTimeStampFormIdNumber(String idNumber) {
    // 进行出生日期赋值
    int year = Integer.valueOf(idNumber.substring(6, 10));
    int month = Integer.valueOf(idNumber.substring(10, 12));
    int day = Integer.valueOf(idNumber.substring(12, 14));

    Calendar calendar = Calendar.getInstance();
    calendar.set(year, month - 1, day, 12, 0, 0);
    calendar.set(year, month - 1, day, 12, 0, 0);
    return new Timestamp(calendar.getTimeInMillis());
  }

  public String getReligion() {
    return religion;
  }

  public void setReligion(String religion) {
    this.religion = religion;
  }

  public String getVaccinatedPlace() {
    return vaccinatedPlace;
  }

  public void setVaccinatedPlace(String vaccinatedPlace) {
    this.vaccinatedPlace = vaccinatedPlace;
  }

  public Boolean getBeVaccinated() {
    return beVaccinated;
  }

  public void setBeVaccinated(Boolean beVaccinated) {
    this.beVaccinated = beVaccinated;
  }

  public String getNotVaccinatedReason() {
    return notVaccinatedReason;
  }

  public void setNotVaccinatedReason(String notVaccinatedReason) {
    this.notVaccinatedReason = notVaccinatedReason;
  }

  @JsonView(NationalityNameJsonView.class)
  public String getNationalityName() {
    int value = this.nationality;
    if (value == 1) {
      return "汉族";
    } else if (value == 2) {
      return "蒙古族";
    } else if (value == 3) {
      return "回族";
    } else if (value == 4) {
      return "藏族";
    } else if (value == 5) {
      return "维吾尔族";
    } else if (value == 6) {
      return "苗族";
    } else if (value == 7) {
      return "彝族";
    } else if (value == 8) {
      return "壮族";
    } else if (value == 9) {
      return "布依族";
    } else if (value == 10) {
      return "朝鲜族";
    } else if (value == 11) {
      return "满族";
    } else if (value == 12) {
      return "侗族";
    } else if (value == 13) {
      return "瑶族";
    } else if (value == 14) {
      return "白族";
    } else if (value == 15) {
      return "土家族";
    } else if (value == 16) {
      return "哈尼族";
    } else if (value == 17) {
      return "哈萨克族";
    } else if (value == 18) {
      return "傣族";
    } else if (value == 19) {
      return "黎族";
    } else if (value == 20) {
      return "傈僳族";
    } else if (value == 21) {
      return "佤族";
    } else if (value == 22) {
      return "畲族";
    } else if (value == 23) {
      return "高山族";
    } else if (value == 24) {
      return "拉祜族";
    } else if (value == 25) {
      return "水族";
    } else if (value == 26) {
      return "东乡族";
    } else if (value == 27) {
      return "纳西族";
    } else if (value == 28) {
      return "景颇族";
    } else if (value == 29) {
      return "柯尔克孜族";
    } else if (value == 30) {
      return "土族";
    } else if (value == 31) {
      return "达斡尔族";
    } else if (value == 32) {
      return "仫佬族";
    } else if (value == 33) {
      return "羌族";
    } else if (value == 34) {
      return "布朗族";
    } else if (value == 35) {
      return "撒拉族";
    } else if (value == 36) {
      return "毛南族";
    } else if (value == 37) {
      return "仡佬族";
    } else if (value == 38) {
      return "锡伯族";
    } else if (value == 39) {
      return "阿昌族";
    } else if (value == 40) {
      return "普米族";
    } else if (value == 41) {
      return "塔吉克族";
    } else if (value == 42) {
      return "怒族";
    } else if (value == 43) {
      return "乌孜别克族";
    } else if (value == 44) {
      return "俄罗斯族";
    } else if (value == 45) {
      return "鄂温克族";
    } else if (value == 46) {
      return "德昂族";
    } else if (value == 47) {
      return "保安族";
    } else if (value == 48) {
      return "裕固族";
    } else if (value == 49) {
      return "京族";
    } else if (value == 50) {
      return "塔塔尔族";
    } else if (value == 51) {
      return "独龙族";
    } else if (value == 52) {
      return "鄂伦春族";
    } else if (value == 53) {
      return "赫哲族";
    } else if (value == 54) {
      return "门巴族";
    } else if (value == 55) {
      return "珞巴族";
    } else if (value == 56) {
      return "基诺族";
    } else {
      return "";
    }
  }

  @JsonView(EducationNameJsonView.class)
  public String getEducationName() {
    String[] educations = new String[]{
        "初中及以下",
        "高中",
        "大学专科",
        "大学本科及以上"
    };
    int index = this.getEducation();
    if (index < 0 || index >= educations.length) {
      return "";
    } else {
      return educations[index];
    }
  }

  @JsonView(EmploymentStatusNameJsonView.class)
  public String getEmploymentStatusName() {
    String[] employments = new String[]{
        "失业",
        "就业",
        "退休"
    };
    int index = this.getEmploymentStatus();
    if (index < 0 || index >= employments.length) {
      return "";
    } else {
      return employments[index];
    }
  }

  public String getPoliticalClimateName() {
    String[] politicalClimates = new String[]{
        "群众",
        "党员"
    };
    int index = this.getPoliticalClimate();
    if (index < 0 || index >= politicalClimates.length) {
      return "";
    } else {
      return politicalClimates[index];
    }
  }

  public interface HouseJsonView {
  }

  public interface ReligiousBeliefJsonView {
  }

  public interface CrimedTypeJsonView {
  }

  public interface EnterpriseJsonView {
  }

  public interface SkillJsonView {
  }

  public interface JobTypeJsonView {
  }

  public interface CultJsonView {
  }

  public interface NationalityNameJsonView {
  }

  public interface EducationNameJsonView {
  }

  public interface MaritalStatusNameJsonView {
  }

  public interface EmploymentStatusNameJsonView {
  }

  public interface IdNumberJsonView {
  }

  public interface PhoneJsonView {
  }
}
