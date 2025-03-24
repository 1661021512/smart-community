package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.Utils;
import club.yunzhi.smartcommunity.entity.*;
import club.yunzhi.smartcommunity.enums.HouseOwnType;
import club.yunzhi.smartcommunity.repository.*;
import club.yunzhi.smartcommunity.repository.specs.ResidentSpecs;
import club.yunzhi.smartcommunity.util.IdCardUtil;
import club.yunzhi.smartcommunity.util.SMSUtils;
import com.mengyunzhi.core.exception.ObjectNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import javax.servlet.ServletOutputStream;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * 居民管理服务层实现
 */
@Service
public class ResidentServiceImpl implements ResidentService {
  private final Logger logger = LoggerFactory.getLogger(ResidentServiceImpl.class);
  private final ResidentRepository residentRepository;
  private final EnterpriseRepository enterpriseRepository;
  private final ReligiousBeliefRepository religiousBeliefRepository;
  private final DistrictService districtService;
  private final CultRepository cultRepository;
  private final WebUserService webUserService;
  private final ExportExcelFactory exportExcelFactory;                              // 导出excel工厂
  private final GriderService griderService;                                        // 网格员
  private final DistrictRepository districtRepository;                              // 区域
  private final ResidentRelationshipsRepository residentRelationshipsRepository;    // 居民间关系
  private final String pathPrefix = "cache/resident";
  private final int exportPageSize = 100;
  private final String separator = " | ";                                         // 居民多处住房时导出的分隔符

  ResidentServiceImpl(
      ResidentRepository residentRepository,
      EnterpriseRepository enterpriseRepository,
      ReligiousBeliefRepository religiousBeliefRepository,
      DistrictService districtService,
      CultRepository cultRepository,
      WebUserService webUserService, ExportExcelFactory exportExcelFactory, GriderService griderService, DistrictRepository districtRepository, ResidentRelationshipsRepository residentRelationshipsRepository) {
    this.residentRepository = residentRepository;
    this.enterpriseRepository = enterpriseRepository;
    this.religiousBeliefRepository = religiousBeliefRepository;
    this.districtService = districtService;
    this.cultRepository = cultRepository;
    this.webUserService = webUserService;
    this.exportExcelFactory = exportExcelFactory;
    this.griderService = griderService;
    this.districtRepository = districtRepository;
    this.residentRelationshipsRepository = residentRelationshipsRepository;
    Path filePath = Paths.get(this.pathPrefix);
    if (!Files.exists(filePath)) {
      try {
        Files.createDirectories(filePath);
      } catch (IOException e) {
        this.logger.error("未能成功的创建文件缓存目录");
        e.printStackTrace();
      }
    }
  }

  @Override
  public Resident addHouseIfNotExist(Long id, Long houseId) {
    Assert.notNull(id, "id can not be null");
    Assert.notNull(houseId, "house id can not be null");

    Resident resident = this.getById(id);
    House house = new House();
    house.setId(houseId);
    if (!resident.getHouses().contains(house)) {
      resident.getHouses().add(house);
    }

    return this.residentRepository.save(resident);
  }

  @Override
  @Async
  public void clearYesterdayExcelFile() {
    File dir = new File(this.pathPrefix);
    if (dir.isDirectory()) {
      LocalDateTime today = LocalDateTime.now();
      LocalDateTime yesterday = today.plusDays(-1);
      for (File file : dir.listFiles()) {
        if (file.isFile()) {
          if (file.getName().startsWith(Utils.getDateString("yyyyMMdd", yesterday))) {
            file.deleteOnExit();
          }
        }
      }
    }
  }

  @Override
  public void delete(Long id) {
    Resident resident = getById(id);
    WebUser user = this.webUserService.getCurrentLoginWebUser().orElseThrow(RuntimeException::new);

    logger.debug("获取当前登陆用户的区域及子区域id");
    List<Long> districtIds = this.districtService.getChildrenIdsWithItself(user.getDistrict());

    List<House> houses = resident.getHouses();
    houses.forEach(house -> {
      districtIds.forEach(districtId -> {
        if (house.getBuilding().getId().equals(districtId)) {
          resident.removeHouse(house);
        }
      });
    });

    this.residentRepository.save(resident);
  }

  @Override
  @Transactional(readOnly = true)
  public void exportExcel(String name,
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
                          Boolean beVaccinated,
                          String filename,
                          ExportProgress exportProgress) {

    District district = this.filterDistrictOfCurrentUserAccess(districtId);

    Specification<Resident> specification = this.getSpec(name,
        phone,
        idNumber,
        workPlace,
        politicalClimate,
        education,
        religion,
        district,
        beginAge,
        endAge,
        nationality,
        sex,
        beVaccinated);
    try {
      ExportExcelService exportExcelService = this.exportExcelFactory.getExportExcelService();
      this.addHeader(exportExcelService);

      int page = 0;
      int progress;
      Pageable pageable;
      Page<Resident> residents;
      List<District> manageBuildings = this.districtService.getManageBuildingsWithCurrentLoginUser();
      int totalPages = -1;
      do {
        pageable = PageRequest.of(page, exportPageSize);
        residents = this.residentRepository.findAll(specification, pageable);
        if (totalPages == -1) {
          totalPages = residents.getTotalPages();
        }
        if (totalPages == 0 || (page + 1) == totalPages) {
          progress = 100;
        } else {
          progress = (int) Math.floor((page + 1) * 100 / totalPages);
        }
        exportProgress.sendProgress(progress);
        this.exportExcel(exportExcelService, residents.getContent(), manageBuildings, page * exportPageSize);
        page++;
      } while (!residents.isLast());

      this.writeExcelToFile(exportExcelService, this.pathPrefix + "/" + filename);
    } catch (Exception e) {
      this.logger.error("导出excel时发生错误:");
      this.logger.error(e.getMessage());
      e.printStackTrace();
    }
  }

  @Override
  @Transactional
  public void generateExcel(HistoryExportExcel historyExportExcel) {
    District district = this.filterDistrictOfWebUserAccess(historyExportExcel.getDistrictId(), historyExportExcel.getWebUser());

    Specification<Resident> specification = this.getSpec(historyExportExcel.getName(),
        historyExportExcel.getPhone(),
        historyExportExcel.getIdNumber(),
        historyExportExcel.getWorkPlace(),
        historyExportExcel.getPoliticalClimate(),
        historyExportExcel.getEducation(),
        historyExportExcel.getReligion(),
        district,
        historyExportExcel.getBeginAge(),
        historyExportExcel.getEndAge(),
        historyExportExcel.getNationality(),
        historyExportExcel.getSex(),
        historyExportExcel.getBeVaccinated());

    ExportExcelService exportExcelService = this.exportExcelFactory.getExportExcelService();
    this.addHeaderByWebUser(exportExcelService, historyExportExcel.getWebUser());

    List<Resident> residents = this.residentRepository.findAll(specification);
    // 防止懒查询异常
    WebUser webUser = this.webUserService.getById(historyExportExcel.getWebUser().getId());

    List<District> manageBuildings = this.districtService.getManageBuildingsWithWebUser(webUser);
    this.exportExcel(exportExcelService, residents, manageBuildings, 0);

    this.writeExcelToFile(exportExcelService, this.pathPrefix + "/" + historyExportExcel.getFilename());
  }

  /**
   * 过滤掉当前登录用户并不拥有权限的区域
   * <p>
   * 如果传入了districtId，则看当前登录用户是否拥有传入的区域ID的管理权限。
   * 有权限，返回对应区域；无权限，返回当前登录用户所在区域；
   * 如果未传入districtId直接返回登录用户所在区域
   * </p>
   *
   * @param districtId 区域ID
   */
  District filterDistrictOfCurrentUserAccess(Long districtId) {
    District district;
    if (districtId != null && this.districtService.checkManageAccessOfCurrentUser(districtId)) {
      district = this.districtRepository.findById(districtId).orElse(null);
    } else {
      district = this.webUserService.getCurrentLoginWebUser().orElseThrow(RuntimeException::new).getDistrict();
    }
    return district;
  }

  /**
   * 过滤掉当前传入用户并不拥有权限的区域
   * <p>
   * 如果传入了districtId，则看当前传入用户是否拥有传入的区域ID的管理权限。
   * 有权限，返回对应区域；无权限，返回当前传入用户所在区域；
   * 如果未传入districtId直接返回传入用户所在区域
   * </p>
   *
   * @param districtId 区域ID
   */
  District filterDistrictOfWebUserAccess(Long districtId, WebUser webUser) {
    District district;
    if (districtId != null && this.districtService.checkManageAccessOfWebUser(districtId, webUser)) {
      district = this.districtRepository.findById(districtId).orElse(null);
    } else {
      district = webUser.getDistrict();
    }
    return district;
  }

  /**
   * 将EXCEL写入文件
   *
   * @param exportExcelService EXCEL导出服务
   * @param pathAndFilename    文件名
   */
  private void writeExcelToFile(ExportExcelService exportExcelService, String pathAndFilename) {
    FileOutputStream fileOutputStream = null;
    try {
      fileOutputStream = new FileOutputStream(pathAndFilename);
    } catch (FileNotFoundException e) {
      e.printStackTrace();
    }
    DataOutputStream dataOutputStream = new DataOutputStream(fileOutputStream);
    exportExcelService.write(dataOutputStream);
    try {
      dataOutputStream.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  private void addHeader(ExportExcelService exportExcelService) {
    WebUser user = this.webUserService.getCurrentLoginWebUser().orElseThrow(RuntimeException::new);
    this.addHeaderByWebUser(exportExcelService, user);
  }

  private void addHeaderByWebUser(ExportExcelService exportExcelService, WebUser user) {
    exportExcelService.createSheet(user.getDistrict().getName());
    this.logger.debug("生成标题");
    String[] colNames = new String[]{"序号",
        "系统编号",
        "姓名",
        "性别",
        "年龄",
        "身份证号",
        "电话",
        "民族",
        "宗教",
        "文化程度",
        "政治面貌",
        "工作单位",
        "社区",
        "小(片)区",
        "楼栋(排)",
        "单元",
        "门牌号",
        "住房性质",
        "户编号",
        "户主",
        "与户主关系",
        "婚姻状况",
        "流动人口",
        "户籍所在地",
        "是否低保",
        "是否残疾",
        "是否医保",
        "是否养老保险",
        "是否高龄补贴",
        "是否空巢",
        "就业情况",
        "是否在校生",
        "是否复转军人",
        "是否接种疫苗",
        "备注"
    };
    exportExcelService.setTitle(user.getDistrict().getName() + "居民数据", colNames.length);
    exportExcelService.goToNextRow();

    for (String col : colNames) {
      exportExcelService.setCell(col, true);
    }
    exportExcelService.goToNextRow();
  }

  /**
   * 将所有居民导出excel
   *
   * @param residents 居民
   */
  void exportExcel(ExportExcelService exportExcelService,
                   List<Resident> residents,
                   List<District> belongBuildings,
                   int beginIndex) {
    logger.debug("生成数据");
    int i = beginIndex;
    for (Resident resident : residents) {
      i++;
      exportExcelService.setCell(String.valueOf(i));
      exportExcelService.setCell(resident.getId().toString());
      exportExcelService.setCell(resident.getName());
      exportExcelService.setCell(resident.getSex().equals(true) ? "男" : "女");
      exportExcelService.setCell(String.valueOf(resident.getAge()));
      exportExcelService.setCell(String.valueOf(resident.getIdNumber()));
      exportExcelService.setCell(String.valueOf(resident.getPhone()));
      exportExcelService.setCell(String.valueOf(resident.getNationalityName()));
      exportExcelService.setCell(String.valueOf(resident.getReligiousBelief() == null ? "" : resident.getReligiousBelief().getName()));
      exportExcelService.setCell(String.valueOf(resident.getEducationName()));
      exportExcelService.setCell(resident.getPoliticalClimateName());
      exportExcelService.setCell(resident.getWorkPlace());

      // 过滤掉当前登录用户无权查看的住房信息
//      List<House> houses = resident.getHouses().stream().filter(house -> {
//        District district = house.getBuilding();
//        boolean found = false;
//        for (District building : belongBuildings) {
//          if (!found && district.getId().equals(building.getId())) {
//            found = true;
//          }
//        }
//        return found;
//      }).collect(Collectors.toList());

      // 社区、小区、楼栋、单元、门牌号
      StringBuilder communityName = new StringBuilder();
      StringBuilder villageName = new StringBuilder();
      StringBuilder buildingName = new StringBuilder();
      StringBuilder unitName = new StringBuilder();
      StringBuilder houseName = new StringBuilder();
      StringBuilder houseType = new StringBuilder();          // 住房性质
      StringBuilder owner = new StringBuilder();              // 户主
      StringBuilder relationShip = new StringBuilder();       // 与户主关系

      int j = 0;
      for (House house : resident.getHouses()) {
        if (j > 0) {
          communityName.append(separator);
          villageName.append(separator);
          buildingName.append(separator);
          unitName.append(separator);
          houseName.append(separator);
          houseType.append(separator);
          owner.append(separator);
          relationShip.append(separator);
        }
        communityName.append(house.getBuilding().getVillage().getCommunity().getName());
        villageName.append(house.getBuilding().getVillage().getName());
        buildingName.append(house.getBuilding().getName());
        unitName.append(house.getUnit().getName());
        houseName.append(house.getName());
        houseType.append(HouseOwnType.getHouseOwnType(house.getType()).getDescription());
        if (house.getOwner() != null) {
          owner.append(house.getOwner().getName());
          Optional<ResidentRelationships> residentRelationships = this.residentRelationshipsRepository
              .findByOneResidentIdAndAnotherResidentId(resident.getId(), house.getOwner().getId());
          residentRelationships.ifPresent(relationships -> relationShip.append(relationships.getRelationship().getName()));
        }
        j++;
      }
      exportExcelService.setCell(communityName.toString());           // 社区
      exportExcelService.setCell(villageName.toString());             // 小区
      exportExcelService.setCell(buildingName.toString());            // 楼栋（排）号
      exportExcelService.setCell(unitName.toString());                // 单元号
      exportExcelService.setCell(houseName.toString());               // 门牌号
      exportExcelService.setCell(houseType.toString());               // 房屋性质
      exportExcelService.setCell(resident.getAccountNumber());        // 户编号
      exportExcelService.setCell(owner.toString());                   // 户主
      exportExcelService.setCell(relationShip.toString());            // 与户主关系
      exportExcelService.setCell(resident.getMaritalStatusName());
      exportExcelService.setCell(ExportExcelService.booleanToString(resident.getBeFloating()));
      exportExcelService.setCell(resident.getDomicilePlace());
      exportExcelService.setCell(ExportExcelService.booleanToString(resident.getBeSubsistenceAllowances()));
      exportExcelService.setCell(ExportExcelService.booleanToString(resident.getBeDisabled()));
      exportExcelService.setCell(ExportExcelService.booleanToString(resident.getBeMedicalInsurance()));
      exportExcelService.setCell(ExportExcelService.booleanToString(resident.getBeEndowmentInsurance()));
      exportExcelService.setCell(ExportExcelService.booleanToString(resident.getBeOldAgeAllowance()));
      exportExcelService.setCell(ExportExcelService.booleanToString(resident.getBeEmptyNest()));
      exportExcelService.setCell(resident.getEmploymentStatusName());
      exportExcelService.setCell(ExportExcelService.booleanToString(resident.getBeStudent()));
      exportExcelService.setCell(ExportExcelService.booleanToString(resident.getBeSoldier()));
      exportExcelService.setCell(ExportExcelService.booleanToString(resident.getBeVaccinated()));
      exportExcelService.setCell(String.valueOf(resident.getRemarks()));
      exportExcelService.goToNextRow();
    }
  }

  @Override
  public long countByDistrict(District district) {
    return this.residentRepository.count(ResidentSpecs.belongDistrict(district));
  }

  @Override
  public Long countByCreateUser(WebUser user) {
    Assert.notNull(user, "用户不能为空");
    Assert.notNull(user, "用户id不能为空");

    logger.debug("根据居民id查询");
    return this.residentRepository.countAllByCreateUserIdAndDeletedIsFalse(user.getId());
  }

  @Override
  public Resident getById(Long id) {
    return this.residentRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("居民实体不存在"));
  }

  @Override
  public Resident getByIdNumber(String idNumber) {
    return this.residentRepository.findByIdNumberAndDeletedIsFalse(idNumber).orElse(null);
  }

  @Override
  public Resident save(Resident newResident) {
    logger.debug("对数据进行验证");
    validateSaveAndPostBasicData(newResident);

    Resident resident = new Resident();
    setResident(resident, newResident);

    resident.setIdNumber(newResident.getIdNumber());

    return this.residentRepository.save(resident);
  }

  @Override
  public List<Resident> updateAll(List<Resident> residents) {
    for (Resident resident : residents) {
      this.update(resident.getId(), resident);
    }
    return residents;
  }

  @Override
  public void validateSaveAndPostBasicData(Resident resident) {
    Assert.notNull(resident.getAccountNumber(), "AccountNumber 接收到的居民属性不全");
    Assert.notNull(resident.getChronicDiseaseDetails(), "chronicDiseaseDetails 接收到的居民属性不全");
    Assert.notNull(resident.getBeCrimed(), "BeCrimed接收到的居民属性不全");
    Assert.notNull(resident.getBeCultMember(), "BeCultMember接收到的居民属性不全");
    Assert.notNull(resident.getBeDisabled(), "getBeDisabled()接收到的居民属性不全");
    Assert.notNull(resident.getBeDisabledSolider(), "getBeDisabledSolider()接收到的居民属性不全");
    Assert.notNull(resident.getBeEmptyNest(), "getBeEmptyNest()接收到的居民属性不全");
    Assert.notNull(resident.getBeEndowmentInsurance(), "getBeEndowmentInsurance()接收到的居民属性不全");
    Assert.notNull(resident.getBeEnterToWar(), "getBeEnterToWar()接收到的居民属性不全");
    Assert.notNull(resident.getBeFloating(), "getBeFloating()接收到的居民属性不全");
    Assert.notNull(resident.getBeLeftBehindChildren(), "getBeLeftBehindChildren()接收到的居民属性不全");
    Assert.notNull(resident.getBeLetterImitationPeople(), "getBeLetterImitationPeople()接收到的居民属性不全");
    Assert.notNull(resident.getBeLonelyOrWidowed(), "getBeLonelyOrWidowed()接收到的居民属性不全");
    Assert.notNull(resident.getBeMedicalInsurance(), "getBeMedicalInsurance()接收到的居民属性不全");
    Assert.notNull(resident.getBeNuclear(), "getBeNuclear()接收到的居民属性不全");
    Assert.notNull(resident.getBeOldAgeAllowance(), "getBeOldAgeAllowance()接收到的居民属性不全");
    Assert.notNull(resident.getBeSoldier(), "getBeSoldier()接收到的居民属性不全");
    Assert.notNull(resident.getBeStudent(), "getBeStudent()接收到的居民属性不全");
    Assert.notNull(resident.getBeSubsistenceAllowances(), "getBeSubsistenceAllowances()接收到的居民属性不全");
    Assert.notNull(resident.getBeVolunteer(), "getBeVolunteer()接收到的居民属性不全");
    Assert.notNull(resident.getChronicDiseaseDetails(), "getChronicDiseaseDetails()接收到的居民属性不全");
    Assert.notNull(resident.getCrimedTypes(), "getCrimedTypes()接收到的居民属性不全");
    Assert.notNull(resident.getDomicilePlace(), "getDomicilePlace()接收到的居民属性不全");
    Assert.notNull(resident.getEducation(), "getEducation()接收到的居民属性不全");
    Assert.notNull(resident.getEnterprise(), "getEnterprise()接收到的居民属性不全");
    Assert.notNull(resident.getEmploymentStatus(), "getEmploymentStatus()接收到的居民属性不全");
    Assert.notNull(resident.getFloatedPlace(), "getFloatedPlace()接收到的居民属性不全");
    Assert.notNull(resident.getIdNumber(), "getIdNumber()接收到的居民属性不全");
    Assert.notNull(resident.getLetterImitationContent(), "getLetterImitationContent()接收到的居民属性不全");
    Assert.notNull(resident.getLocalDomicile(), "getLocalDomicile()接收到的居民属性不全");
    Assert.notNull(resident.getMaritalStatus(), "getMaritalStatus()接收到的居民属性不全");
    Assert.notNull(resident.getName(), "getName()接收到的居民属性不全");
    Assert.notNull(resident.getNationality(), "getNationality()接收到的居民属性不全");
    Assert.notNull(resident.getPhone(), "getPhone()接收到的居民属性不全");
    Assert.notNull(resident.getPoliticalClimate(), "getPoliticalClimate()接收到的居民属性不全");
    Assert.notNull(resident.getRemarks(), "getRemarks()接收到的居民属性不全");
    Assert.notNull(resident.getSchool(), "getSchool()接收到的居民属性不全");
    Assert.notNull(resident.getSchoolAddress(), "getSchoolAddress()接收到的居民属性不全");
    Assert.notNull(resident.getWorkPlace(), "getWorkPlace()接收到的居民属性不全");
    // todo: resident.religiousBelief,
    Assert.isTrue(IdCardUtil.isValidCard(resident.getIdNumber()), "身份证号码格式不正确" + resident.getIdNumber());
    Assert.isTrue(SMSUtils.isMobile(resident.getPhone()), "手机号码格式不正确" + resident.getPhone());
  }

  @Override
  public Resident update(Long id, Resident resident) {
    Resident resident1 = this.getById(id);

    logger.debug("调用保存那个方法");
    setResident(resident1, resident);

    return this.residentRepository.save(resident1);
  }

  @Override
  public Page<Resident> page(String name,
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
                             Boolean beVaccinated,
                             Pageable pageable) {
    District district = this.filterDistrictOfCurrentUserAccess(districtId);
    Specification<Resident> specification = this.getSpec(name,
        phone,
        idNumber,
        workPlace,
        politicalClimate,
        education,
        religion,
        district,
        beginAge,
        endAge,
        nationality,
        sex,
        beVaccinated);
    Page<Resident> residents = this.residentRepository.findAll(specification, pageable);

    return residents;
  }

  /**
   * 获取综合查询条件
   *
   * @param name             姓名
   * @param phone            电话
   * @param idNumber         身份证号码
   * @param workPlace        工作单元
   * @param politicalClimate 政治面貌
   * @param education        教育程序
   * @param religion         宗教信仰
   * @param district         区域
   * @param beginAge         开始年龄
   * @param endAge           结束年龄
   * @param nationality      民族
   * @param sex              性别
   * @param beVaccinated     是否接种疫苗
   * @param grider           网格员
   * @return
   */
  Specification<Resident> getSpec(String name,
                                  String phone,
                                  String idNumber,
                                  String workPlace,
                                  Short politicalClimate,
                                  Short education,
                                  String religion,
                                  District district,
                                  Integer beginAge,
                                  Integer endAge,
                                  Short nationality,
                                  Boolean sex,
                                  Boolean beVaccinated,
                                  Grider grider) {
    return ResidentSpecs.containingName(name)
        .and(ResidentSpecs.equalPhone(phone))
        .and(ResidentSpecs.equalIdNumber(idNumber))
        .and(ResidentSpecs.containingWorkPlace(workPlace))
        .and(ResidentSpecs.isPoliticalClimate(politicalClimate))
        .and(ResidentSpecs.isEducation(education))
        .and(ResidentSpecs.containingReligion(religion))
        .and(ResidentSpecs.belongDistrict(district))
        .and(ResidentSpecs.betweenAge(beginAge, endAge))
        .and(ResidentSpecs.isNationality(nationality))
        .and(ResidentSpecs.isSex(sex))
        .and(ResidentSpecs.equalVaccinated(beVaccinated))
        .and(ResidentSpecs.equalHouseGrider(grider))
        .and(ResidentSpecs.distinct());
  }

  /**
   * 获取综合查询条件
   *
   * @param name             姓名
   * @param phone            电话
   * @param idNumber         身份证号码
   * @param workPlace        工作单元
   * @param politicalClimate 政治面貌
   * @param education        教育程序
   * @param religion         宗教信仰
   * @param district         区域
   * @param beginAge         开始年龄
   * @param endAge           结束年龄
   * @param nationality      民族
   * @param sex              性别
   * @param beVaccinated     是否接种疫苗
   * @return
   */
  Specification<Resident> getSpec(String name,
                                  String phone,
                                  String idNumber,
                                  String workPlace,
                                  Short politicalClimate,
                                  Short education,
                                  String religion,
                                  District district,
                                  Integer beginAge,
                                  Integer endAge,
                                  Short nationality,
                                  Boolean sex,
                                  Boolean beVaccinated) {
    return this.getSpec(name,
        phone,
        idNumber,
        workPlace,
        politicalClimate,
        education,
        religion,
        district,
        beginAge,
        endAge,
        nationality,
        sex,
        beVaccinated,
        null);
  }

  @Override
  public Resident removeHouse(Long id, Long houseId) {
    Resident resident = this.getById(id);

    resident.setHouses(resident.getHouses().stream()
        .filter(house -> !house.getId().equals(houseId))
        .collect(Collectors.toList()));

    return this.residentRepository.save(resident);
  }

  @Override
  public Page<Resident> pageOfCurrentGrider(String name,
                                            String phone,
                                            String idNumber,
                                            String workPlace,
                                            Short politicalClimate,
                                            Short education,
                                            String religion,
                                            Integer ageBegin,
                                            Integer ageEnd,
                                            Short nationality,
                                            Boolean sex, Pageable pageable) {
    Optional<Grider> griderOptional = this.griderService.getCurrentGrider();
    if (!griderOptional.isPresent()) {
      this.logger.warn("当前登录用户并不是网格员，但正在尝试获取网格员管理的居民列表信息");
      return Page.empty();
    }

    Specification<Resident> residentSpecification = this.getSpec(
        name,
        phone,
        idNumber,
        workPlace,
        politicalClimate,
        education,
        religion,
        null,
        ageBegin,
        ageEnd,
        nationality,
        sex,
        null,
        griderOptional.get()
    );

    return this.residentRepository.findAll(residentSpecification, pageable);
  }

  @Override
  public void downloadExcelByToken(String token, ServletOutputStream outputStream) {
    File file = Paths.get(this.pathPrefix)
        .resolve(token).toFile();
    if (!file.exists() || !file.isFile()) {
      throw new ObjectNotFoundException(file.getAbsolutePath() + "不存在或类型不是文件");
    }

    logger.debug("输出文件类型");
    FileInputStream inputStream;
    try {
      inputStream = new FileInputStream(file);
    } catch (FileNotFoundException e) {
      String message = "读取文件出错" + file.getAbsolutePath();
      logger.error(message);
      e.printStackTrace();
      throw new RuntimeException(message);
    }

    try {
      org.apache.commons.io.IOUtils.copy(inputStream, outputStream);
      inputStream.close();
    } catch (IOException e) {
      String message = "下发数据时发生了错误";
      logger.error(message);
      e.printStackTrace();
      throw new RuntimeException(message);
    }
  }

  @Override
  public Long countPartyMemberByDistrict(District district) {
    Specification<Resident> residentSpecification = this.getSpec(
        null,
        null,
        null,
        null,
        Resident.POLITICAL_CLIMATE_PARTY,
        null,
        null,
        district,
        null,
        null,
        null,
        null,
        null,
        null
    );

    return this.residentRepository.count(residentSpecification);
  }

  @Override
  public Long countVaccinatedByDistrict(District district) {
    return this.residentRepository.count(
        ResidentSpecs.belongDistrict(district)
            .and(ResidentSpecs.equalVaccinated(true))
            .and(ResidentSpecs.distinct()));
  }


  private Resident setResident(Resident resident, Resident resident1) {
    Assert.isTrue(IdCardUtil.isValidCard(resident1.getIdNumber()), "身份证号码格式不正确:" + resident1.getIdNumber());
    Assert.isTrue(SMSUtils.isMobile(resident1.getPhone()), "手机号码格式不正确" + resident1.getPhone());
    resident.setAccountNumber(resident1.getAccountNumber());
    resident.setBeChronicDisease(resident1.getBeChronicDisease());
    resident.setBeCrimed(resident1.getBeCrimed());
    resident.setBeCultMember(resident1.getBeCultMember());
    resident.setBeDisabled(resident1.getBeDisabled());
    resident.setBeDisabledSolider(resident1.getBeDisabledSolider());
    resident.setBeEmptyNest(resident1.getBeEmptyNest());
    resident.setBeEndowmentInsurance(resident1.getBeEndowmentInsurance());
    resident.setBeEnterToWar(resident1.getBeEnterToWar());
    resident.setBeFloating(resident1.getBeFloating());
    resident.setBeLeftBehindChildren(resident1.getBeLeftBehindChildren());
    resident.setBeLetterImitationPeople(resident1.getBeLetterImitationPeople());
    resident.setBeLonelyOrWidowed(resident1.getBeLonelyOrWidowed());
    resident.setBeMedicalInsurance(resident1.getBeMedicalInsurance());
    resident.setBeNuclear(resident1.getBeNuclear());
    resident.setBeOldAgeAllowance(resident1.getBeOldAgeAllowance());
    resident.setBeSoldier(resident1.getBeSoldier());
    resident.setBeStudent(resident1.getBeStudent());
    resident.setBeSubsistenceAllowances(resident1.getBeSubsistenceAllowances());
    resident.setBeVolunteer(resident1.getBeVolunteer());
    resident.setChronicDiseaseDetails(resident1.getChronicDiseaseDetails());
    resident.setDomicilePlace(resident1.getDomicilePlace());
    resident.setEducation(resident1.getEducation());
    resident.setEmploymentStatus(resident1.getEmploymentStatus());
    resident.setBeVaccinated(resident1.getBeVaccinated());
    resident.setVaccinatedPlace(resident1.getVaccinatedPlace());
    resident.setNotVaccinatedReason(resident1.getNotVaccinatedReason());
    if (resident1.getBeVaccinated() != null) {
      resident.setBeVaccinated(resident1.getBeVaccinated());
      resident.setVaccinatedPlace(resident1.getVaccinatedPlace());
      resident.setNotVaccinatedReason(resident1.getNotVaccinatedReason());
    }

    if (resident1.getEnterprise() != null) {
      if (resident1.getEnterprise().getId() != null) {
        resident.setEnterprise(resident1.getEnterprise());
      } else if (!resident1.getEnterprise().getName().trim().isEmpty()) {
        String name = resident1.getEnterprise().getName().trim();
        resident.setEnterprise(this.enterpriseRepository.findByNameAndDeletedIsFalse(name).orElseGet(() -> {
          Enterprise enterprise = new Enterprise();
          enterprise.setName(name);
          return this.enterpriseRepository.save(enterprise);
        }));
      }
    }

    if (resident1.getReligiousBelief() != null) {
      if (resident1.getReligiousBelief().getId() != null) {
        resident.setReligiousBelief(resident1.getReligiousBelief());
      } else if (!resident1.getReligiousBelief().getName().trim().isEmpty()) {
        String name = resident1.getReligiousBelief().getName().trim();
        resident.setReligiousBelief(this.religiousBeliefRepository.findByNameAndDeletedIsFalse(name).orElseGet(() -> {
          ReligiousBelief religiousBelief = new ReligiousBelief();
          religiousBelief.setName(name);
          return this.religiousBeliefRepository.save(religiousBelief);
        }));
      }
    }

    // 加入的邪教组织
    if (resident1.getCult() != null) {
      if (resident1.getCult().getId() != null) {
        resident.setCult(resident1.getCult());
      } else if (!resident1.getCult().getName().trim().isEmpty()) {
        String name = resident1.getCult().getName().trim();
        resident.setCult(this.cultRepository.findByNameAndDeletedIsFalse(name).orElseGet(() -> {
          Cult cult = new Cult();
          cult.setName(name);
          return this.cultRepository.save(cult);
        }));
      }
    }

    resident.setFloatedDate(resident1.getFloatedDate());
    resident.setFloatedPlace(resident1.getFloatedPlace());
    resident.setJobTypeRequirements(resident1.getJobTypeRequirements());
    resident.setName(resident1.getName());
    resident.setPhone(resident1.getPhone());
    resident.setRemarks(resident1.getRemarks());
    resident.setWorkPlace(resident1.getWorkPlace());
    resident.setSchool(resident1.getSchool());
    resident.setSchoolAddress(resident1.getSchoolAddress());
    resident.setMaritalStatus(resident1.getMaritalStatus());
    resident.setNationality(resident1.getNationality());
    resident.setLocalDomicile(resident1.getLocalDomicile());
    resident.setLetterImitationContent(resident1.getLetterImitationContent());
    resident.setPoliticalClimate(resident1.getPoliticalClimate());
    resident.setCrimedTypes(resident1.getCrimedTypes());
    resident.setSkills(resident1.getSkills());
    return resident;
  }
}
